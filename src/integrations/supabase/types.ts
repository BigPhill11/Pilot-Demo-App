export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "13.0.5"
  }
  public: {
    Tables: {
      companies: {
        Row: {
          analyst_sentiment: string | null
          created_at: string | null
          created_by: string | null
          financials: Json | null
          headquarters: string | null
          historical_performance: string | null
          id: string
          industry: string
          kpis: Json | null
          logo_url: string | null
          market_cap: string | null
          market_sentiment: string | null
          name: string
          overview: string | null
          pe_ratio: string | null
          revenue_ttm: string | null
          sector: string | null
          sub_sector: string | null
          ticker: string
          updated_at: string | null
        }
        Insert: {
          analyst_sentiment?: string | null
          created_at?: string | null
          created_by?: string | null
          financials?: Json | null
          headquarters?: string | null
          historical_performance?: string | null
          id?: string
          industry: string
          kpis?: Json | null
          logo_url?: string | null
          market_cap?: string | null
          market_sentiment?: string | null
          name: string
          overview?: string | null
          pe_ratio?: string | null
          revenue_ttm?: string | null
          sector?: string | null
          sub_sector?: string | null
          ticker: string
          updated_at?: string | null
        }
        Update: {
          analyst_sentiment?: string | null
          created_at?: string | null
          created_by?: string | null
          financials?: Json | null
          headquarters?: string | null
          historical_performance?: string | null
          id?: string
          industry?: string
          kpis?: Json | null
          logo_url?: string | null
          market_cap?: string | null
          market_sentiment?: string | null
          name?: string
          overview?: string | null
          pe_ratio?: string | null
          revenue_ttm?: string | null
          sector?: string | null
          sub_sector?: string | null
          ticker?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      initial_assessments: {
        Row: {
          answers: Json | null
          assessment_type: string
          completed_at: string
          created_at: string | null
          id: string
          score: number | null
          user_id: string
        }
        Insert: {
          answers?: Json | null
          assessment_type: string
          completed_at?: string
          created_at?: string | null
          id?: string
          score?: number | null
          user_id: string
        }
        Update: {
          answers?: Json | null
          assessment_type?: string
          completed_at?: string
          created_at?: string | null
          id?: string
          score?: number | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "initial_assessments_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      lesson_completions: {
        Row: {
          career_id: string
          completed_at: string
          completed_by_admin: boolean | null
          created_at: string | null
          id: string
          lesson_level: number
          user_id: string
        }
        Insert: {
          career_id: string
          completed_at?: string
          completed_by_admin?: boolean | null
          created_at?: string | null
          id?: string
          lesson_level: number
          user_id: string
        }
        Update: {
          career_id?: string
          completed_at?: string
          completed_by_admin?: boolean | null
          created_at?: string | null
          id?: string
          lesson_level?: number
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "lesson_completions_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      market_data_cache: {
        Row: {
          asset_type: string
          change_percent: number | null
          created_at: string | null
          id: string
          last_updated: string | null
          name: string
          price: number | null
        }
        Insert: {
          asset_type: string
          change_percent?: number | null
          created_at?: string | null
          id?: string
          last_updated?: string | null
          name: string
          price?: number | null
        }
        Update: {
          asset_type?: string
          change_percent?: number | null
          created_at?: string | null
          id?: string
          last_updated?: string | null
          name?: string
          price?: number | null
        }
        Relationships: []
      }
      market_predictions: {
        Row: {
          created_at: string | null
          id: string
          points_earned: number | null
          predicted_price: number | null
          reasoning: string | null
          sentiment: string
          updated_at: string | null
          user_id: string
          week_ending: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          points_earned?: number | null
          predicted_price?: number | null
          reasoning?: string | null
          sentiment: string
          updated_at?: string | null
          user_id: string
          week_ending: string
        }
        Update: {
          created_at?: string | null
          id?: string
          points_earned?: number | null
          predicted_price?: number | null
          reasoning?: string | null
          sentiment?: string
          updated_at?: string | null
          user_id?: string
          week_ending?: string
        }
        Relationships: []
      }
      module_progress: {
        Row: {
          completed_at: string | null
          course_id: string | null
          created_at: string | null
          detailed_progress: Json | null
          id: string
          improvement_percentage: number | null
          last_accessed: string | null
          module_id: string
          module_type: string
          post_test_score: number | null
          pre_test_score: number | null
          progress_percentage: number | null
          time_spent_minutes: number | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          completed_at?: string | null
          course_id?: string | null
          created_at?: string | null
          detailed_progress?: Json | null
          id?: string
          improvement_percentage?: number | null
          last_accessed?: string | null
          module_id: string
          module_type: string
          post_test_score?: number | null
          pre_test_score?: number | null
          progress_percentage?: number | null
          time_spent_minutes?: number | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          completed_at?: string | null
          course_id?: string | null
          created_at?: string | null
          detailed_progress?: Json | null
          id?: string
          improvement_percentage?: number | null
          last_accessed?: string | null
          module_id?: string
          module_type?: string
          post_test_score?: number | null
          pre_test_score?: number | null
          progress_percentage?: number | null
          time_spent_minutes?: number | null
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      paper_portfolios: {
        Row: {
          cash: number | null
          created_at: string | null
          id: string
          updated_at: string | null
          user_id: string
        }
        Insert: {
          cash?: number | null
          created_at?: string | null
          id?: string
          updated_at?: string | null
          user_id: string
        }
        Update: {
          cash?: number | null
          created_at?: string | null
          id?: string
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      paper_positions: {
        Row: {
          asset_type: string
          avg_price: number
          created_at: string | null
          id: string
          portfolio_id: string
          shares: number
          symbol: string
          updated_at: string | null
        }
        Insert: {
          asset_type: string
          avg_price: number
          created_at?: string | null
          id?: string
          portfolio_id: string
          shares: number
          symbol: string
          updated_at?: string | null
        }
        Update: {
          asset_type?: string
          avg_price?: number
          created_at?: string | null
          id?: string
          portfolio_id?: string
          shares?: number
          symbol?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "paper_positions_portfolio_id_fkey"
            columns: ["portfolio_id"]
            isOneToOne: false
            referencedRelation: "paper_portfolios"
            referencedColumns: ["id"]
          },
        ]
      }
      paper_transactions: {
        Row: {
          asset_type: string
          created_at: string | null
          id: string
          portfolio_id: string
          price: number
          shares: number
          symbol: string
          total_amount: number
          transaction_type: string
        }
        Insert: {
          asset_type: string
          created_at?: string | null
          id?: string
          portfolio_id: string
          price: number
          shares: number
          symbol: string
          total_amount: number
          transaction_type: string
        }
        Update: {
          asset_type?: string
          created_at?: string | null
          id?: string
          portfolio_id?: string
          price?: number
          shares?: number
          symbol?: string
          total_amount?: number
          transaction_type?: string
        }
        Relationships: [
          {
            foreignKeyName: "paper_transactions_portfolio_id_fkey"
            columns: ["portfolio_id"]
            isOneToOne: false
            referencedRelation: "paper_portfolios"
            referencedColumns: ["id"]
          },
        ]
      }
      phils_friends_videos: {
        Row: {
          category: string | null
          company: string | null
          course_category: string | null
          created_at: string | null
          created_by: string | null
          description: string | null
          duration_sec: number | null
          duration_seconds: number | null
          id: string
          level: string | null
          name: string | null
          processing_status: string | null
          published: boolean | null
          role_tier: string | null
          soft_skills_section: string | null
          source_type: string | null
          speaker_name: string | null
          storage_path: string | null
          tags: string | null
          thumbnail_url: string | null
          title: string
          updated_at: string | null
          video_file_path: string | null
          video_type: string | null
          video_url: string | null
          youtube_url: string | null
        }
        Insert: {
          category?: string | null
          company?: string | null
          course_category?: string | null
          created_at?: string | null
          created_by?: string | null
          description?: string | null
          duration_sec?: number | null
          duration_seconds?: number | null
          id?: string
          level?: string | null
          name?: string | null
          processing_status?: string | null
          published?: boolean | null
          role_tier?: string | null
          soft_skills_section?: string | null
          source_type?: string | null
          speaker_name?: string | null
          storage_path?: string | null
          tags?: string | null
          thumbnail_url?: string | null
          title: string
          updated_at?: string | null
          video_file_path?: string | null
          video_type?: string | null
          video_url?: string | null
          youtube_url?: string | null
        }
        Update: {
          category?: string | null
          company?: string | null
          course_category?: string | null
          created_at?: string | null
          created_by?: string | null
          description?: string | null
          duration_sec?: number | null
          duration_seconds?: number | null
          id?: string
          level?: string | null
          name?: string | null
          processing_status?: string | null
          published?: boolean | null
          role_tier?: string | null
          soft_skills_section?: string | null
          source_type?: string | null
          speaker_name?: string | null
          storage_path?: string | null
          tags?: string | null
          thumbnail_url?: string | null
          title?: string
          updated_at?: string | null
          video_file_path?: string | null
          video_type?: string | null
          video_url?: string | null
          youtube_url?: string | null
        }
        Relationships: []
      }
      profiles: {
        Row: {
          age_confirmed: boolean | null
          app_tour_completed: boolean | null
          app_version: string | null
          average_session_duration: number | null
          behavioral_segment:
            | Database["public"]["Enums"]["behavioral_segment_enum"]
            | null
          created_at: string | null
          current_streak: number | null
          device_preference: string | null
          email: string | null
          engagement_score: number | null
          experience_level: string | null
          finance_goals: string[] | null
          first_session_at: string | null
          goals: string[] | null
          id: string
          interests: string[] | null
          last_active_at: string | null
          learning_progress: Json | null
          learning_style:
            | Database["public"]["Enums"]["learning_style_enum"]
            | null
          onboarding_completed: boolean | null
          placement_score: number | null
          placement_track: string | null
          preferred_content_types: string[] | null
          profile_completion_score: number | null
          survey_completed: boolean | null
          time_commitment: string | null
          total_sessions: number | null
          total_xp: number | null
          updated_at: string | null
          username: string | null
        }
        Insert: {
          age_confirmed?: boolean | null
          app_tour_completed?: boolean | null
          app_version?: string | null
          average_session_duration?: number | null
          behavioral_segment?:
            | Database["public"]["Enums"]["behavioral_segment_enum"]
            | null
          created_at?: string | null
          current_streak?: number | null
          device_preference?: string | null
          email?: string | null
          engagement_score?: number | null
          experience_level?: string | null
          finance_goals?: string[] | null
          first_session_at?: string | null
          goals?: string[] | null
          id: string
          interests?: string[] | null
          last_active_at?: string | null
          learning_progress?: Json | null
          learning_style?:
            | Database["public"]["Enums"]["learning_style_enum"]
            | null
          onboarding_completed?: boolean | null
          placement_score?: number | null
          placement_track?: string | null
          preferred_content_types?: string[] | null
          profile_completion_score?: number | null
          survey_completed?: boolean | null
          time_commitment?: string | null
          total_sessions?: number | null
          total_xp?: number | null
          updated_at?: string | null
          username?: string | null
        }
        Update: {
          age_confirmed?: boolean | null
          app_tour_completed?: boolean | null
          app_version?: string | null
          average_session_duration?: number | null
          behavioral_segment?:
            | Database["public"]["Enums"]["behavioral_segment_enum"]
            | null
          created_at?: string | null
          current_streak?: number | null
          device_preference?: string | null
          email?: string | null
          engagement_score?: number | null
          experience_level?: string | null
          finance_goals?: string[] | null
          first_session_at?: string | null
          goals?: string[] | null
          id?: string
          interests?: string[] | null
          last_active_at?: string | null
          learning_progress?: Json | null
          learning_style?:
            | Database["public"]["Enums"]["learning_style_enum"]
            | null
          onboarding_completed?: boolean | null
          placement_score?: number | null
          placement_track?: string | null
          preferred_content_types?: string[] | null
          profile_completion_score?: number | null
          survey_completed?: boolean | null
          time_commitment?: string | null
          total_sessions?: number | null
          total_xp?: number | null
          updated_at?: string | null
          username?: string | null
        }
        Relationships: []
      }
      soft_skills_courses: {
        Row: {
          category: string
          content: Json | null
          created_at: string | null
          description: string | null
          difficulty_level: string | null
          duration_minutes: number | null
          id: string
          thumbnail_url: string | null
          title: string
          updated_at: string | null
        }
        Insert: {
          category: string
          content?: Json | null
          created_at?: string | null
          description?: string | null
          difficulty_level?: string | null
          duration_minutes?: number | null
          id?: string
          thumbnail_url?: string | null
          title: string
          updated_at?: string | null
        }
        Update: {
          category?: string
          content?: Json | null
          created_at?: string | null
          description?: string | null
          difficulty_level?: string | null
          duration_minutes?: number | null
          id?: string
          thumbnail_url?: string | null
          title?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      trading_portfolios: {
        Row: {
          cash: number | null
          created_at: string | null
          id: string
          updated_at: string | null
          user_id: string
        }
        Insert: {
          cash?: number | null
          created_at?: string | null
          id?: string
          updated_at?: string | null
          user_id: string
        }
        Update: {
          cash?: number | null
          created_at?: string | null
          id?: string
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      trading_positions: {
        Row: {
          asset_type: string
          avg_price: number
          created_at: string | null
          id: string
          portfolio_id: string
          shares: number
          symbol: string
          updated_at: string | null
        }
        Insert: {
          asset_type: string
          avg_price: number
          created_at?: string | null
          id?: string
          portfolio_id: string
          shares: number
          symbol: string
          updated_at?: string | null
        }
        Update: {
          asset_type?: string
          avg_price?: number
          created_at?: string | null
          id?: string
          portfolio_id?: string
          shares?: number
          symbol?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "trading_positions_portfolio_id_fkey"
            columns: ["portfolio_id"]
            isOneToOne: false
            referencedRelation: "trading_portfolios"
            referencedColumns: ["id"]
          },
        ]
      }
      trading_videos: {
        Row: {
          created_at: string | null
          created_by: string | null
          description: string | null
          difficulty_level: string | null
          duration: number | null
          id: string
          instructor_bio: string | null
          instructor_credentials: string | null
          instructor_name: string | null
          thumbnail_url: string | null
          title: string
          topic_category: string | null
          topics: string[] | null
          updated_at: string | null
          video_url: string
          view_count: number | null
        }
        Insert: {
          created_at?: string | null
          created_by?: string | null
          description?: string | null
          difficulty_level?: string | null
          duration?: number | null
          id?: string
          instructor_bio?: string | null
          instructor_credentials?: string | null
          instructor_name?: string | null
          thumbnail_url?: string | null
          title: string
          topic_category?: string | null
          topics?: string[] | null
          updated_at?: string | null
          video_url: string
          view_count?: number | null
        }
        Update: {
          created_at?: string | null
          created_by?: string | null
          description?: string | null
          difficulty_level?: string | null
          duration?: number | null
          id?: string
          instructor_bio?: string | null
          instructor_credentials?: string | null
          instructor_name?: string | null
          thumbnail_url?: string | null
          title?: string
          topic_category?: string | null
          topics?: string[] | null
          updated_at?: string | null
          video_url?: string
          view_count?: number | null
        }
        Relationships: []
      }
      user_achievements: {
        Row: {
          achievement_id: string
          created_at: string | null
          id: string
          unlocked_at: string
          user_id: string
        }
        Insert: {
          achievement_id: string
          created_at?: string | null
          id?: string
          unlocked_at?: string
          user_id: string
        }
        Update: {
          achievement_id?: string
          created_at?: string | null
          id?: string
          unlocked_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_achievements_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      user_activity_log: {
        Row: {
          activity_category: string
          activity_details: Json | null
          activity_type: Database["public"]["Enums"]["activity_type_enum"]
          duration_seconds: number | null
          engagement_level: string | null
          id: string
          session_id: string | null
          timestamp: string
          user_id: string
        }
        Insert: {
          activity_category: string
          activity_details?: Json | null
          activity_type: Database["public"]["Enums"]["activity_type_enum"]
          duration_seconds?: number | null
          engagement_level?: string | null
          id?: string
          session_id?: string | null
          timestamp?: string
          user_id: string
        }
        Update: {
          activity_category?: string
          activity_details?: Json | null
          activity_type?: Database["public"]["Enums"]["activity_type_enum"]
          duration_seconds?: number | null
          engagement_level?: string | null
          id?: string
          session_id?: string | null
          timestamp?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_activity_log_session_id_fkey"
            columns: ["session_id"]
            isOneToOne: false
            referencedRelation: "user_sessions"
            referencedColumns: ["id"]
          },
        ]
      }
      user_company_interactions: {
        Row: {
          company_id: string
          created_at: string | null
          id: string
          interaction_type: string
          user_id: string
        }
        Insert: {
          company_id: string
          created_at?: string | null
          id?: string
          interaction_type: string
          user_id: string
        }
        Update: {
          company_id?: string
          created_at?: string | null
          id?: string
          interaction_type?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_company_interactions_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
        ]
      }
      user_progress: {
        Row: {
          achievements: Json | null
          created_at: string | null
          engagement_score: number | null
          id: string
          learning_progress: Json | null
          level_progress: number | null
          quiz_scores: Json | null
          total_points: number | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          achievements?: Json | null
          created_at?: string | null
          engagement_score?: number | null
          id?: string
          learning_progress?: Json | null
          level_progress?: number | null
          quiz_scores?: Json | null
          total_points?: number | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          achievements?: Json | null
          created_at?: string | null
          engagement_score?: number | null
          id?: string
          learning_progress?: Json | null
          level_progress?: number | null
          quiz_scores?: Json | null
          total_points?: number | null
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      user_sessions: {
        Row: {
          created_at: string | null
          device_info: Json | null
          duration_seconds: number | null
          entry_point: string | null
          exit_point: string | null
          id: string
          pages_visited: Json | null
          session_end: string | null
          session_start: string
          updated_at: string | null
          user_id: string
        }
        Insert: {
          created_at?: string | null
          device_info?: Json | null
          duration_seconds?: number | null
          entry_point?: string | null
          exit_point?: string | null
          id?: string
          pages_visited?: Json | null
          session_end?: string | null
          session_start?: string
          updated_at?: string | null
          user_id: string
        }
        Update: {
          created_at?: string | null
          device_info?: Json | null
          duration_seconds?: number | null
          entry_point?: string | null
          exit_point?: string | null
          id?: string
          pages_visited?: Json | null
          session_end?: string | null
          session_start?: string
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      video_analytics: {
        Row: {
          completion_percentage: number | null
          created_at: string | null
          id: string
          last_watched_position: number | null
          updated_at: string | null
          user_id: string | null
          video_id: string
          watch_duration_seconds: number | null
        }
        Insert: {
          completion_percentage?: number | null
          created_at?: string | null
          id?: string
          last_watched_position?: number | null
          updated_at?: string | null
          user_id?: string | null
          video_id: string
          watch_duration_seconds?: number | null
        }
        Update: {
          completion_percentage?: number | null
          created_at?: string | null
          id?: string
          last_watched_position?: number | null
          updated_at?: string | null
          user_id?: string | null
          video_id?: string
          watch_duration_seconds?: number | null
        }
        Relationships: []
      }
      video_clips: {
        Row: {
          clip_order: number | null
          created_at: string | null
          end_sec: number
          excerpt: string | null
          id: string
          published: boolean | null
          start_sec: number
          thumbnail_url: string | null
          title: string
          updated_at: string | null
          video_id: string
        }
        Insert: {
          clip_order?: number | null
          created_at?: string | null
          end_sec: number
          excerpt?: string | null
          id?: string
          published?: boolean | null
          start_sec: number
          thumbnail_url?: string | null
          title: string
          updated_at?: string | null
          video_id: string
        }
        Update: {
          clip_order?: number | null
          created_at?: string | null
          end_sec?: number
          excerpt?: string | null
          id?: string
          published?: boolean | null
          start_sec?: number
          thumbnail_url?: string | null
          title?: string
          updated_at?: string | null
          video_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "video_clips_video_id_fkey"
            columns: ["video_id"]
            isOneToOne: false
            referencedRelation: "phils_friends_videos"
            referencedColumns: ["id"]
          },
        ]
      }
      video_comments: {
        Row: {
          content: string
          created_at: string | null
          helpful_votes: number | null
          id: string
          parent_comment_id: string | null
          user_id: string
          video_id: string
        }
        Insert: {
          content: string
          created_at?: string | null
          helpful_votes?: number | null
          id?: string
          parent_comment_id?: string | null
          user_id: string
          video_id: string
        }
        Update: {
          content?: string
          created_at?: string | null
          helpful_votes?: number | null
          id?: string
          parent_comment_id?: string | null
          user_id?: string
          video_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "video_comments_parent_comment_id_fkey"
            columns: ["parent_comment_id"]
            isOneToOne: false
            referencedRelation: "video_comments"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "video_comments_video_id_fkey"
            columns: ["video_id"]
            isOneToOne: false
            referencedRelation: "trading_videos"
            referencedColumns: ["id"]
          },
        ]
      }
      video_points: {
        Row: {
          created_at: string | null
          id: string
          milestone_type: string | null
          points_earned: number | null
          user_id: string
          video_id: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          milestone_type?: string | null
          points_earned?: number | null
          user_id: string
          video_id: string
        }
        Update: {
          created_at?: string | null
          id?: string
          milestone_type?: string | null
          points_earned?: number | null
          user_id?: string
          video_id?: string
        }
        Relationships: []
      }
      video_ratings: {
        Row: {
          clarity_rating: number | null
          created_at: string | null
          difficulty_rating: number | null
          entertainment_rating: number | null
          id: string
          usefulness_rating: number | null
          user_id: string
          video_id: string
        }
        Insert: {
          clarity_rating?: number | null
          created_at?: string | null
          difficulty_rating?: number | null
          entertainment_rating?: number | null
          id?: string
          usefulness_rating?: number | null
          user_id: string
          video_id: string
        }
        Update: {
          clarity_rating?: number | null
          created_at?: string | null
          difficulty_rating?: number | null
          entertainment_rating?: number | null
          id?: string
          usefulness_rating?: number | null
          user_id?: string
          video_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "video_ratings_video_id_fkey"
            columns: ["video_id"]
            isOneToOne: false
            referencedRelation: "trading_videos"
            referencedColumns: ["id"]
          },
        ]
      }
      video_segments: {
        Row: {
          created_at: string | null
          description: string | null
          end_time: number
          id: string
          keywords: string[] | null
          segment_type: string | null
          start_time: number
          title: string
          video_id: string
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          end_time: number
          id?: string
          keywords?: string[] | null
          segment_type?: string | null
          start_time: number
          title: string
          video_id: string
        }
        Update: {
          created_at?: string | null
          description?: string | null
          end_time?: number
          id?: string
          keywords?: string[] | null
          segment_type?: string | null
          start_time?: number
          title?: string
          video_id?: string
        }
        Relationships: []
      }
      video_transcripts: {
        Row: {
          confidence_score: number | null
          created_at: string | null
          id: string
          language_code: string | null
          processing_status: string | null
          raw_content: string
          searchable_content: string | null
          transcript_type: string | null
          updated_at: string | null
          video_id: string
          word_timestamps: Json | null
        }
        Insert: {
          confidence_score?: number | null
          created_at?: string | null
          id?: string
          language_code?: string | null
          processing_status?: string | null
          raw_content: string
          searchable_content?: string | null
          transcript_type?: string | null
          updated_at?: string | null
          video_id: string
          word_timestamps?: Json | null
        }
        Update: {
          confidence_score?: number | null
          created_at?: string | null
          id?: string
          language_code?: string | null
          processing_status?: string | null
          raw_content?: string
          searchable_content?: string | null
          transcript_type?: string | null
          updated_at?: string | null
          video_id?: string
          word_timestamps?: Json | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      get_video_average_ratings: {
        Args: { video_id_param: string }
        Returns: {
          avg_clarity: number
          avg_difficulty: number
          avg_entertainment: number
          avg_usefulness: number
          total_ratings: number
        }[]
      }
      handle_daily_login: { Args: { user_id_param: string }; Returns: Json }
    }
    Enums: {
      activity_type_enum:
        | "page_view"
        | "feature_interaction"
        | "quiz_attempt"
        | "video_watch"
        | "profile_edit"
        | "game_play"
      behavioral_segment_enum:
        | "explorer"
        | "achiever"
        | "focused_learner"
        | "casual_browser"
        | "passive_observer"
        | "dormant"
      learning_style_enum: "visual" | "reading" | "interactive" | "video"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      activity_type_enum: [
        "page_view",
        "feature_interaction",
        "quiz_attempt",
        "video_watch",
        "profile_edit",
        "game_play",
      ],
      behavioral_segment_enum: [
        "explorer",
        "achiever",
        "focused_learner",
        "casual_browser",
        "passive_observer",
        "dormant",
      ],
      learning_style_enum: ["visual", "reading", "interactive", "video"],
    },
  },
} as const
