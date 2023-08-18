import useCurrentUser from "@/hooks/useCurrentUser";
import { NextPageContext } from "next";
import { getSession } from "next-auth/react";
import { useRouter } from "next/router";

const Profiles = () => {
  const router = useRouter();
  const { data: currentUser } = useCurrentUser();
  return (
    <div className="flex items-center h-full justify-center">
      <div className="flex flex-col">
        <h1 className="text-3xl md:text-6xl text-white text-center">
          Who is watching?
          <div className="flex items-center justify-center gap-8 mt-10">
            <div onClick={() => router.push("/")}>
              <div className="group flex-row w-44 mx-auto">
                <div className="w-44 h-44 rounded-md flex items-center justify-center border-2 border-transparent group-hover:cursor-pointer group-hover:border-white overflow-hidden">
                  <img
                    draggable={false}
                    className="w-max h-max object-contain"
                    src="/images/default-green.png"
                    alt="Profile image"
                  />
                </div>
                <div className="mt-4 text-gray-400 text-2xl text-center group-hover:text-white">
                  {currentUser?.name}
                </div>
              </div>
            </div>
          </div>
        </h1>
      </div>
    </div>
  );
};

export default Profiles;

export async function getServerSideProps(context: NextPageContext) {
  const session = await getSession(context);

  if (!session) {
    return {
      redirect: {
        destination: "/auth",
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
}
