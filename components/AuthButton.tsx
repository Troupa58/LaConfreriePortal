import Image from "next/image";
import { auth } from "@/auth";
import { loginWithDiscord, logout } from "@/app/actions";

export async function AuthButton() {
  const session = await auth();

  if (!session?.user) {
    return (
      <form action={loginWithDiscord}>
        <button className="button buttonDiscord" type="submit">
          Connexion Discord
        </button>
      </form>
    );
  }

  return (
    <div className="userMenu">
      {session.user.image && (
        <Image
          src={session.user.image}
          alt=""
          width={38}
          height={38}
          className="avatar"
          unoptimized
        />
      )}
      <span>{session.user.name}</span>
      <form action={logout}>
        <button className="textButton" type="submit">
          Déconnexion
        </button>
      </form>
    </div>
  );
}
