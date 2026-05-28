export const PHIL_ADMIN_EMAILS = ['phillipghead@gmail.com'] as const;

export function isPhilAdminEmail(email: string | null | undefined): boolean {
  return !!email && PHIL_ADMIN_EMAILS.includes(email.toLowerCase() as typeof PHIL_ADMIN_EMAILS[number]);
}
