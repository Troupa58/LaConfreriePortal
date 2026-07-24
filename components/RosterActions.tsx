import { registerForEvent, unregisterFromEvent } from "@/app/actions";

export function RosterActions({
  eventId,
  isRegistered,
  isFull,
  isConnected
}: {
  eventId: string;
  isRegistered: boolean;
  isFull: boolean;
  isConnected: boolean;
}) {
  if (isRegistered) {
    return (
      <form action={unregisterFromEvent}>
        <input type="hidden" name="eventId" value={eventId} />
        <button className="button buttonDanger" type="submit">
          Se désinscrire
        </button>
      </form>
    );
  }

  return (
    <form action={registerForEvent}>
      <input type="hidden" name="eventId" value={eventId} />
      <button
        className="button buttonPrimary"
        type="submit"
        disabled={isFull}
      >
        {!isConnected
          ? "Se connecter et s’inscrire"
          : isFull
            ? "Roster complet"
            : "S’inscrire"}
      </button>
    </form>
  );
}
