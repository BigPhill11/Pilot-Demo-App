import React, { useState, useCallback, useEffect, useMemo, useRef } from 'react';
import { Plus, Minus, Hammer } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useEmpireViewport } from './hooks/useEmpireViewport';
import BambooEmpireTutorial from './tutorial/BambooEmpireTutorial';
import {
  EmpireTutorialProvider,
  useEmpireTutorial,
  type TutorialSpotlightHandler,
} from './tutorial/EmpireTutorialContext';
import {
  isTutorialComplete,
  TUTORIAL_DEMO_EVENT,
  TUTORIAL_GRANT_COINS,
  TUTORIAL_GRANT_XP,
  TUTORIAL_SEEDED_COLLECTION,
  type EmpireTutorialStep,
  type TutorialAction,
} from './tutorial/empireTutorialSteps';
import { EMPIRE_BOTTOM_UI, EMPIRE_BOTTOM_UI_TUTORIAL } from './constants/layout';

import { IsometricGrid, TerrainType } from './canvas';
import { BuildingSprite, GhostPreview, BuildingType, BUILDING_DEFINITIONS } from './buildings';
import {
  BuildingMenu,
  BuildingInfoPanel,
  CoinCounter,
  OfflineProgress,
  OfflineAwaySummary,
  EventBanner,
  EventHistory,
  CreditCardPanel,
  CreditUnlockBanner,
} from './ui';
import { useProductionManager, useEventManager, useCreditManager } from './systems';
import type { EventHistoryEntry, EventType } from './systems/EventManager';
import { useBaseLayoutStore, PlacedBuilding } from '@/store/useBaseLayoutStore';
import { useGameStore } from '@/store/useGameStore';
import { useCreditStore } from '@/store/useCreditStore';
import {
  getBuildingAtTile,
  getBuildingRenderOrder,
  gridToScreen,
  GRID_SIZE,
  PLAYABLE_BORDER,
  TILE_HEIGHT,
  TILE_WIDTH,
} from './lib/grid';

const getEmpireViewBox = (): string => {
  const minTile = PLAYABLE_BORDER;
  const maxTile = GRID_SIZE - PLAYABLE_BORDER - 1;
  const corners = [
    gridToScreen(minTile, minTile),
    gridToScreen(maxTile, minTile),
    gridToScreen(minTile, maxTile),
    gridToScreen(maxTile, maxTile),
  ];

  const minX = Math.min(...corners.map((corner) => corner.screenX)) - TILE_WIDTH * 3;
  const maxX = Math.max(...corners.map((corner) => corner.screenX)) + TILE_WIDTH * 3;
  const minY = Math.min(...corners.map((corner) => corner.screenY)) - TILE_HEIGHT * 7;
  const maxY = Math.max(...corners.map((corner) => corner.screenY)) + TILE_HEIGHT * 5;

  return `${minX} ${minY} ${maxX - minX} ${maxY - minY}`;
};

const HOVER_THROTTLE_MS = 32;

const EmpireCanvasInner: React.FC = () => {
  const navigate = useNavigate();
  const viewBox = useMemo(() => getEmpireViewBox(), []);
  const tutorial = useEmpireTutorial();
  const {
    startTutorial,
    restartTutorial,
    sessionId,
    setTutorialBuildingId,
    setSpotlightHandler,
    reportAction,
    isActive: isTutorialActive,
    step: tutorialStep,
    tutorialBuildingId,
    runType: tutorialRunType,
  } = tutorial;
  const grantCoinsAppliedRef = useRef(false);
  const isFirstTimeTutorial = tutorialRunType === 'first_time';
  const isTutorialPlaceStep =
    tutorial.isActive &&
    tutorial.step.id === 'place_farm' &&
    tutorialRunType === 'first_time';

  const [selectedTile, setSelectedTile] = useState<{ x: number; y: number } | null>(null);
  const [showBuildMenu, setShowBuildMenu] = useState(false);
  const [selectedBuildingType, setSelectedBuildingType] = useState<BuildingType | null>(null);
  const [ghostPosition, setGhostPosition] = useState<{ x: number; y: number } | null>(null);
  const [selectedBuilding, setSelectedBuilding] = useState<PlacedBuilding | null>(null);
  const [showOfflineProgress, setShowOfflineProgress] = useState(false);
  const [offlineEarnings, setOfflineEarnings] = useState({ amount: 0, duration: '' });
  const [showAwaySummary, setShowAwaySummary] = useState(false);
  const [awayEvents, setAwayEvents] = useState<EventHistoryEntry[]>([]);
  const [showEventHistory, setShowEventHistory] = useState(false);
  const [dismissedEvent, setDismissedEvent] = useState<string | null>(null);
  const [showCreditPanel, setShowCreditPanel] = useState(false);
  const [pendingCreditPurchase, setPendingCreditPurchase] = useState<BuildingType | null>(null);
  const [constructionProgressMap, setConstructionProgressMap] = useState<Record<string, number>>({});
  const [dojoCooldowns, setDojoCooldowns] = useState<Record<string, number>>({});
  const [hiRes, setHiRes] = useState(false);
  const lastHoverRef = useRef(0);
  const timedWorkBootstrappedRef = useRef(false);

  const buildings = useBaseLayoutStore((state) => state.buildings);
  const placeNewBuilding = useBaseLayoutStore((state) => state.placeNewBuilding);
  const canPlaceAt = useBaseLayoutStore((state) => state.canPlaceAt);
  const completeTimedWork = useBaseLayoutStore((state) => state.completeTimedWork);
  const catchUpTimedWork = useBaseLayoutStore((state) => state.catchUpTimedWork);
  const completeConstruction = useBaseLayoutStore((state) => state.completeConstruction);
  const updateBuildingCollection = useBaseLayoutStore((state) => state.updateBuildingCollection);
  const xp = useGameStore((state) => state.xp);
  const addBamboo = useGameStore((state) => state.addBamboo);
  const addXp = useGameStore((state) => state.addXp);
  const empireProductivity = useGameStore((state) => state.empireProductivity);
  const applyEmpireProductivityDelta = useGameStore((state) => state.applyEmpireProductivityDelta);
  const productivityFactor = Math.max(0.05, Math.min(1, empireProductivity / 100));

  const { chargeEmpireExpense, enabled: creditEnabled, enableCreditCard } = useCreditStore();

  useEffect(() => {
    if (!creditEnabled) {
      enableCreditCard();
    }
  }, [creditEnabled, enableCreditCard]);

  useEffect(() => {
    if (timedWorkBootstrappedRef.current) return;
    timedWorkBootstrappedRef.current = true;
    catchUpTimedWork();
  }, [catchUpTimedWork]);

  const { isOverdue } = useCreditManager({
    onLateFee: () => {},
  });

  const handleEventStart = useCallback(() => {
    setDismissedEvent(null);
  }, []);

  const handleOfflineCatchUp = useCallback((entries: EventHistoryEntry[]) => {
    if (entries.length > 0) {
      setAwayEvents(entries);
      setShowAwaySummary(true);
    }
  }, []);

  const {
    activeEvent,
    eventHistory,
    isCollectionBlocked,
    getRemainingTime,
    insuranceProtection,
    productionMultiplier,
    triggerEvent,
  } = useEventManager({
    onEventStart: handleEventStart,
    pauseScheduling: tutorial.isActive,
    onOfflineCatchUp: handleOfflineCatchUp,
  });

  const showEventBanner = activeEvent && dismissedEvent !== activeEvent.event.id;

  const handleEventBannerDismiss = useCallback(() => {
    if (activeEvent) setDismissedEvent(activeEvent.event.id);
    if (tutorial.isActive && isFirstTimeTutorial && tutorial.step.action === 'dismiss_event') {
      tutorial.reportAction('dismiss_event');
    }
  }, [activeEvent, tutorial, isFirstTimeTutorial]);

  const handleOfflineEarnings = useCallback((earnings: number, duration: string) => {
    setOfflineEarnings({ amount: earnings, duration });
    setShowOfflineProgress(true);
  }, []);

  const { totalStorage, productionRate, collectFromBuilding } = useProductionManager({
    onOfflineEarnings: handleOfflineEarnings,
    productionMultiplier,
    storageMultiplier: activeEvent?.event.effect.storageMultiplier ?? 1,
    productivityFactor,
  });

  const viewport = useEmpireViewport();

  useEffect(() => {
    const el = viewport.transformRef.current;
    if (!el) return;
    const observer = new MutationObserver(() => {
      const match = el.style.transform.match(/scale\(([^)]+)\)/);
      const zoom = match ? parseFloat(match[1]) : 1;
      setHiRes((prev) => {
        const next = zoom >= 1.2;
        return prev !== next ? next : prev;
      });
    });
    observer.observe(el, { attributes: true, attributeFilter: ['style'] });
    return () => observer.disconnect();
  }, [viewport.transformRef]);

  const handleStepEnter = useCallback(
    (step: EmpireTutorialStep) => {
      switch (step.onEnter) {
        case 'grant_starter_resources':
          if (tutorialRunType === 'first_time' && !grantCoinsAppliedRef.current) {
            grantCoinsAppliedRef.current = true;
            addBamboo(TUTORIAL_GRANT_COINS, 'tutorial');
            addXp(TUTORIAL_GRANT_XP, 'tutorial');
          }
          break;
        case 'open_build_menu':
          if (tutorialRunType === 'first_time') {
            setShowBuildMenu(true);
          }
          break;
        case 'instant_complete_building': {
          if (tutorialRunType !== 'first_time') break;
          const id = tutorial.tutorialBuildingId;
          if (id) completeConstruction(id);
          break;
        }
        case 'seed_collection': {
          if (tutorialRunType !== 'first_time') break;
          const id = tutorial.tutorialBuildingId;
          if (!id) break;
          const building = useBaseLayoutStore.getState().buildings.find((b) => b.id === id);
          if (!building || building.type !== 'bamboo_farm') break;
          const currentPending = building.pendingCollection ?? 0;
          if (currentPending < TUTORIAL_SEEDED_COLLECTION) {
            updateBuildingCollection(id, TUTORIAL_SEEDED_COLLECTION - currentPending);
          }
          const updated = useBaseLayoutStore.getState().buildings.find((b) => b.id === id);
          if (updated) setSelectedBuilding(updated);
          break;
        }
        case 'open_credit_panel':
          if (tutorialRunType === 'first_time') {
            setShowCreditPanel(true);
          }
          break;
        case 'trigger_demo_event':
          if (tutorialRunType === 'first_time') {
            triggerEvent(TUTORIAL_DEMO_EVENT);
          }
          break;
        default:
          break;
      }
    },
    [
      addBamboo,
      addXp,
      completeConstruction,
      triggerEvent,
      tutorial.tutorialBuildingId,
      tutorialRunType,
      updateBuildingCollection,
    ],
  );

  useEffect(() => {
    tutorial.setStepEnterHandler(handleStepEnter);
    return () => tutorial.setStepEnterHandler(null);
  }, [handleStepEnter, tutorial]);

  useEffect(() => {
    if (!isTutorialComplete()) {
      const timer = window.setTimeout(() => startTutorial(), 400);
      return () => window.clearTimeout(timer);
    }
  }, [startTutorial]);

  useEffect(() => {
    if (sessionId === 0) return;
    grantCoinsAppliedRef.current = false;
    setShowBuildMenu(false);
    setSelectedBuildingType(null);
    setSelectedBuilding(null);
    setGhostPosition(null);
    setTutorialBuildingId(null);
  }, [sessionId, setTutorialBuildingId]);

  useEffect(() => {
    if (!selectedBuilding) return;
    const updated = buildings.find((building) => building.id === selectedBuilding.id);
    if (updated) {
      setSelectedBuilding(updated);
    } else {
      setSelectedBuilding(null);
    }
  }, [buildings, selectedBuilding]);

  const finishTutorialPlacement = useCallback(
    (buildingId: string) => {
      tutorial.setTutorialBuildingId(buildingId);
      completeConstruction(buildingId);
    },
    [completeConstruction, tutorial],
  );

  const handleTileClick = useCallback(
    (x: number, y: number, terrain: TerrainType) => {
      if (selectedBuildingType) {
        const def = BUILDING_DEFINITIONS[selectedBuildingType];
        const isValid = canPlaceAt(x, y, undefined, def.size) && terrain === 'grass';

        if (isValid) {
          if (tutorial.isActive && !isFirstTimeTutorial) {
            return;
          }

          if (pendingCreditPurchase === selectedBuildingType || !pendingCreditPurchase) {
            const result = chargeEmpireExpense(def.cost);
            if (result.success) {
              const before = useBaseLayoutStore.getState().buildings.length;
              placeNewBuilding(selectedBuildingType, x, y, def.size, xp);
              const placed = useBaseLayoutStore.getState().buildings[before];
              if (placed && tutorial.isActive && isFirstTimeTutorial) {
                finishTutorialPlacement(placed.id);
                if (tutorial.step.action === 'place_dojo') {
                  tutorial.reportAction('place_dojo');
                } else {
                  tutorial.reportAction('place_building');
                }
              }
              setSelectedBuildingType(null);
              setGhostPosition(null);
              setPendingCreditPurchase(null);
            }
          }
        }
        return;
      }

      const clickedBuilding = getBuildingAtTile(buildings, x, y);

      if (clickedBuilding) {
        if (
          tutorial.isActive &&
          isFirstTimeTutorial &&
          (tutorial.step.action === 'select_placed_building' ||
            tutorial.step.action === 'select_dojo_building') &&
          clickedBuilding.id === tutorial.tutorialBuildingId
        ) {
          setSelectedBuilding(clickedBuilding);
          tutorial.reportAction(tutorial.step.action);
        } else if (!tutorial.isActive) {
          setSelectedBuilding(clickedBuilding);
        }
        return;
      }

      if (terrain === 'grass' && !tutorial.isActive) {
        setSelectedTile({ x, y });
        setShowBuildMenu(true);
      }
    },
    [
      selectedBuildingType,
      buildings,
      xp,
      canPlaceAt,
      placeNewBuilding,
      pendingCreditPurchase,
      chargeEmpireExpense,
      isFirstTimeTutorial,
      tutorial,
      finishTutorialPlacement,
    ],
  );

  const handleTileHover = useCallback(
    (x: number, y: number) => {
      if (!selectedBuildingType) return;
      const now = Date.now();
      if (now - lastHoverRef.current < HOVER_THROTTLE_MS) return;
      lastHoverRef.current = now;
      setGhostPosition({ x, y });
    },
    [selectedBuildingType],
  );

  const handleSelectBuilding = useCallback(
    (type: BuildingType) => {
      setSelectedBuildingType(type);
      setShowBuildMenu(false);
      setPendingCreditPurchase(type);
      if (
        isTutorialActive &&
        isFirstTimeTutorial &&
        type === 'bamboo_farm' &&
        tutorial.step.action === 'select_farm'
      ) {
        reportAction('select_farm');
      }
      if (
        isTutorialActive &&
        isFirstTimeTutorial &&
        type === 'training_dojo' &&
        tutorial.step.action === 'select_dojo'
      ) {
        reportAction('select_dojo');
      }
    },
    [isTutorialActive, isFirstTimeTutorial, reportAction, tutorial.step.action],
  );

  useEffect(() => {
    if (!isFirstTimeTutorial) {
      setSpotlightHandler(null);
      return;
    }

    const handler: TutorialSpotlightHandler = (action: TutorialAction) => {
      switch (action) {
        case 'tap_build':
          setShowBuildMenu(true);
          reportAction('tap_build');
          break;
        case 'select_farm':
          handleSelectBuilding('bamboo_farm');
          break;
        case 'select_dojo':
          handleSelectBuilding('training_dojo');
          break;
        case 'place_building':
        case 'place_dojo':
          break;
        case 'select_placed_building': {
          const building = buildings.find((b) => b.id === tutorialBuildingId);
          if (building) {
            setSelectedBuilding(building);
            reportAction('select_placed_building');
          }
          break;
        }
        case 'select_dojo_building': {
          const building = buildings.find((b) => b.id === tutorialBuildingId);
          if (building) {
            setSelectedBuilding(building);
            reportAction('select_dojo_building');
          }
          break;
        }
        case 'collect_building':
          document
            .querySelector<HTMLElement>('[data-tutorial="building-info-collect"]')
            ?.click();
          break;
        case 'upgrade_building':
          document
            .querySelector<HTMLElement>('[data-tutorial="building-info-upgrade"]')
            ?.click();
          break;
        case 'open_credit':
          setShowCreditPanel(true);
          reportAction('open_credit');
          break;
        case 'pay_minimum':
          document
            .querySelector<HTMLElement>('[data-tutorial="credit-pay-minimum"]')
            ?.click();
          break;
        case 'dismiss_event':
          handleEventBannerDismiss();
          break;
        case 'use_dojo':
          document
            .querySelector<HTMLElement>('[data-tutorial="dojo-meditation"]')
            ?.click();
          break;
        default:
          break;
      }
    };

    setSpotlightHandler(handler);
    return () => setSpotlightHandler(null);
  }, [
    isFirstTimeTutorial,
    setSpotlightHandler,
    reportAction,
    handleSelectBuilding,
    handleTileClick,
    handleEventBannerDismiss,
    buildings,
    tutorialBuildingId,
  ]);

  const handleCollect = useCallback(
    (buildingId: string) => {
      if (isCollectionBlocked) return;
      const collected = collectFromBuilding(buildingId);
      if (
        collected > 0 &&
        tutorial.isActive &&
        isFirstTimeTutorial &&
        tutorial.step.action === 'collect_building'
      ) {
        tutorial.reportAction('collect_building');
        const updated = useBaseLayoutStore.getState().buildings.find((building) => building.id === buildingId);
        if (updated) setSelectedBuilding(updated);
        return;
      }
      setSelectedBuilding(null);
    },
    [collectFromBuilding, isCollectionBlocked, isFirstTimeTutorial, tutorial],
  );

  const handleCollectOffline = useCallback(() => {
    addBamboo(offlineEarnings.amount, 'offline');
    setShowOfflineProgress(false);
  }, [offlineEarnings.amount, addBamboo]);

  const handleDojoProgram = useCallback(
    (program: 'meditation' | 'workout' | 'happy_hour') => {
      const now = Date.now();
      if ((dojoCooldowns[program] ?? 0) > now) {
        return false;
      }

      let triggered = true;
      let cooldownMs = 5 * 60 * 1000;

      if (program === 'meditation') {
        applyEmpireProductivityDelta(12);
        cooldownMs = 3 * 60 * 1000;
      } else {
        const eventType: EventType = program === 'workout' ? 'workout_session' : 'happy_hour';
        triggered = Boolean(triggerEvent(eventType));
      }

      if (!triggered) return false;

      setDojoCooldowns((current) => ({
        ...current,
        [program]: now + cooldownMs,
      }));

      if (
        tutorial.isActive &&
        isFirstTimeTutorial &&
        tutorial.step.action === 'use_dojo' &&
        program === 'meditation'
      ) {
        tutorial.reportAction('use_dojo');
      }

      return true;
    },
    [
      applyEmpireProductivityDelta,
      dojoCooldowns,
      isFirstTimeTutorial,
      triggerEvent,
      tutorial,
    ],
  );

  const cancelPlacement = useCallback(() => {
    if (tutorial.isActive) return;
    setSelectedBuildingType(null);
    setGhostPosition(null);
  }, [tutorial.isActive]);

  useEffect(() => {
    const tickTimedWork = () => {
      const now = Date.now();
      const next: Record<string, number> = {};
      let hasTimedWork = false;

      buildings.forEach((building: PlacedBuilding) => {
        const isTimed =
          (building.status === 'constructing' || building.status === 'upgrading') &&
          building.constructionStartTime &&
          building.constructionEndTime;

        if (!isTimed) return;

        hasTimedWork = true;
        next[building.id] = Math.min(
          100,
          ((now - building.constructionStartTime!) /
            (building.constructionEndTime! - building.constructionStartTime!)) *
            100,
        );

        if (now >= building.constructionEndTime!) {
          completeTimedWork(building.id);
          delete next[building.id];
        }
      });

      setConstructionProgressMap(hasTimedWork ? next : {});
    };

    tickTimedWork();
    const interval = setInterval(tickTimedWork, 1000);
    return () => clearInterval(interval);
  }, [buildings, completeTimedWork]);

  const ghostIsValid =
    selectedBuildingType && ghostPosition
      ? canPlaceAt(
          ghostPosition.x,
          ghostPosition.y,
          undefined,
          BUILDING_DEFINITIONS[selectedBuildingType].size,
        )
      : false;

  const sortedBuildings = useMemo(
    () =>
      [...buildings].sort(
        (left, right) => getBuildingRenderOrder(left) - getBuildingRenderOrder(right),
      ),
    [buildings],
  );

  return (
    <div className="relative w-full h-full overflow-hidden select-none touch-none">
      <div ref={viewport.wheelRef} className="absolute inset-0 touch-none">
        <div
          ref={viewport.transformRef}
          className="h-full w-full touch-none will-change-transform"
          style={{ contain: 'layout paint' }}
        >
          <svg
            className="block h-full w-full"
            viewBox={viewBox}
            preserveAspectRatio="xMidYMid meet"
            style={{
              background: 'linear-gradient(to bottom, #065f46, #064e3b)',
            }}
            data-tutorial="empire-grid"
            onPointerDownCapture={viewport.onPointerDownCapture}
          >
            <defs>
              <linearGradient id="waterShimmer" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#93c5fd" stopOpacity="0.5" />
                <stop offset="50%" stopColor="#60a5fa" stopOpacity="0.3" />
                <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.5" />
              </linearGradient>
              <radialGradient id="goldGlow" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#fbbf24" stopOpacity="0.6" />
                <stop offset="100%" stopColor="#fbbf24" stopOpacity="0" />
              </radialGradient>
              <radialGradient id="lilyPadGradient" cx="30%" cy="30%" r="70%">
                <stop offset="0%" stopColor="#4ade80" />
                <stop offset="100%" stopColor="#16a34a" />
              </radialGradient>
            </defs>

            <IsometricGrid
              selectedTile={selectedTile}
              onTileClick={handleTileClick}
              onTileHover={handleTileHover}
              highlightBuildableTiles={isTutorialPlaceStep}
              ghostBuilding={
                selectedBuildingType && ghostPosition
                  ? {
                      type: selectedBuildingType,
                      size: BUILDING_DEFINITIONS[selectedBuildingType].size,
                      position: ghostPosition,
                      isValid: ghostIsValid,
                    }
                  : null
              }
            />

            <g>
              {sortedBuildings.map((building: PlacedBuilding) => {
                const constructionProgress =
                  building.status === 'constructing' || building.status === 'upgrading'
                    ? (constructionProgressMap[building.id] ?? 0)
                    : 100;

                return (
                  <BuildingSprite
                    key={building.id}
                    type={building.type as BuildingType}
                    level={building.level}
                    status={building.status}
                    gridX={building.position.x}
                    gridY={building.position.y}
                    constructionProgress={constructionProgress}
                    pendingCollection={building.pendingCollection}
                    isSelected={selectedBuilding?.id === building.id}
                    hiRes={hiRes}
                    onClick={() => {
                      if (
                        tutorial.isActive &&
                        isFirstTimeTutorial &&
                        (tutorial.step.action === 'select_placed_building' ||
                          tutorial.step.action === 'select_dojo_building') &&
                        building.id === tutorial.tutorialBuildingId
                      ) {
                        setSelectedBuilding(building);
                        tutorial.reportAction(tutorial.step.action);
                        return;
                      }
                      if (tutorial.isActive) return;
                      setSelectedBuilding(building);
                    }}
                  />
                );
              })}

              {selectedBuildingType && ghostPosition && (
                <GhostPreview
                  type={selectedBuildingType}
                  gridX={ghostPosition.x}
                  gridY={ghostPosition.y}
                  isValid={ghostIsValid}
                />
              )}
            </g>
          </svg>
        </div>
      </div>

      <CoinCounter
        totalStorage={totalStorage}
        productionRate={productionRate}
        onOpenCredit={
          creditEnabled && (!tutorial.isActive || tutorial.step.action === 'open_credit')
            ? () => setShowCreditPanel(true)
            : undefined
        }
        onOpenEventHistory={
          !tutorial.isActive ? () => setShowEventHistory(true) : undefined
        }
        onGoHome={() => navigate('/')}
        onStartTutorial={isTutorialActive ? undefined : restartTutorial}
        eventHistoryCount={eventHistory.length}
        creditOverdue={isOverdue}
      />

      <div
        className="absolute right-3 z-10 flex flex-col gap-1.5 sm:bottom-24"
        style={{ bottom: 'calc(env(safe-area-inset-bottom, 0px) + 6rem)' }}
      >
        <button
          type="button"
          onClick={viewport.zoomIn}
          className="flex h-11 w-11 items-center justify-center rounded-lg bg-white/90 text-gray-800 shadow-lg dark:bg-gray-800/90 dark:text-white touch-manipulation"
          aria-label="Zoom in"
        >
          <Plus className="h-5 w-5" />
        </button>
        <button
          type="button"
          onClick={viewport.zoomOut}
          className="flex h-11 w-11 items-center justify-center rounded-lg bg-white/90 text-gray-800 shadow-lg dark:bg-gray-800/90 dark:text-white touch-manipulation"
        >
          <Minus className="h-5 w-5" />
        </button>
      </div>

      {showEventBanner && (
        <EventBanner
          activeEvent={activeEvent}
          getRemainingTime={getRemainingTime}
          insuranceProtection={insuranceProtection}
          onDismiss={handleEventBannerDismiss}
        />
      )}

      {!selectedBuildingType && (
        <button
          type="button"
          data-tutorial="build-button"
          onClick={() => {
            setShowBuildMenu(true);
            if (tutorial.isActive && isFirstTimeTutorial && tutorial.step.action === 'tap_build') {
              tutorial.reportAction('tap_build');
            }
          }}
          className={`absolute left-1/2 -translate-x-1/2 flex items-center gap-2 rounded-2xl bg-emerald-500 active:bg-emerald-600 px-7 py-4 text-base sm:text-lg font-bold text-white shadow-xl ring-2 ring-white/30 touch-manipulation select-none ${
            isTutorialActive && tutorialStep.id === 'open_build' ? 'z-[110]' : 'z-20'
          }`}
          style={{
            bottom: isTutorialActive ? EMPIRE_BOTTOM_UI_TUTORIAL : EMPIRE_BOTTOM_UI,
          }}
          aria-label="Open build menu"
        >
          <Hammer className="w-5 h-5" />
          Build
        </button>
      )}

      {selectedBuildingType && !tutorial.isActive && (
        <button
          type="button"
          onClick={cancelPlacement}
          className="absolute left-1/2 -translate-x-1/2 z-20 rounded-2xl bg-red-500 active:bg-red-600 px-7 py-4 text-base sm:text-lg font-bold text-white shadow-xl ring-2 ring-white/30 touch-manipulation select-none"
          style={{
            bottom: tutorial.isActive ? EMPIRE_BOTTOM_UI_TUTORIAL : EMPIRE_BOTTOM_UI,
          }}
        >
          Cancel Placement
        </button>
      )}

      <BuildingMenu
        isOpen={showBuildMenu}
        onClose={() => {
          if (!tutorial.isActive) setShowBuildMenu(false);
        }}
        onSelectBuilding={handleSelectBuilding}
        lockToBuildingType={
          tutorial.isActive && isFirstTimeTutorial && tutorial.step.id === 'select_farm'
            ? 'bamboo_farm'
            : tutorial.isActive && isFirstTimeTutorial && tutorial.step.id === 'select_dojo'
              ? 'training_dojo'
            : null
        }
      />

      <BuildingInfoPanel
        building={selectedBuilding}
        onClose={() => setSelectedBuilding(null)}
        onCollect={handleCollect}
        onUpgrade={() => {
          if (
            tutorial.isActive &&
            isFirstTimeTutorial &&
            tutorial.step.action === 'upgrade_building'
          ) {
            tutorial.reportAction('upgrade_building');
          }
        }}
        onDojoProgram={handleDojoProgram}
        dojoCooldowns={dojoCooldowns}
      />

      <OfflineProgress
        isOpen={showOfflineProgress}
        earnings={offlineEarnings.amount}
        duration={offlineEarnings.duration}
        onClose={() => setShowOfflineProgress(false)}
        onCollect={handleCollectOffline}
      />

      <OfflineAwaySummary
        isOpen={showAwaySummary}
        events={awayEvents}
        onClose={() => setShowAwaySummary(false)}
      />

      <EventHistory
        isOpen={showEventHistory}
        onClose={() => setShowEventHistory(false)}
        history={eventHistory}
      />

      {(!tutorial.isActive || tutorial.step.action === 'pay_minimum') && (
        <CreditCardPanel
          isOpen={showCreditPanel}
          onClose={() => {
            if (!tutorial.isActive) setShowCreditPanel(false);
          }}
          onPayMinimum={() => {
            if (
              tutorial.isActive &&
              isFirstTimeTutorial &&
              tutorial.step.action === 'pay_minimum'
            ) {
              tutorial.reportAction('pay_minimum');
            }
          }}
        />
      )}

      {!tutorial.isActive && (
        <>
          <CreditUnlockBanner />
        </>
      )}

      <BambooEmpireTutorial />
    </div>
  );
};

const EmpireCanvas: React.FC = () => (
  <EmpireTutorialProvider>
    <EmpireCanvasInner />
  </EmpireTutorialProvider>
);

export default EmpireCanvas;
