import useCurrentUser from "@/hooks/useCurrentUser";
import { NextPageContext } from "next";
import { getSession } from "next-auth/react";
import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";

const Profiles = () => {
  const router = useRouter();
  const { data: currentUser } = useCurrentUser();
  return (
    <>
      <Head>
        <title>Netflix | Who is watching?</title>
        <meta
          name="description"
          content="Manage your Netflix profiles with ease. Customize viewing preferences for each member of your household. Create, edit, and personalize profiles to enhance your streaming experience. Organize your entertainment choices and enjoy a tailored selection of TV shows and movies on Netflix."
        ></meta>
      </Head>
      <div className="flex items-center h-full justify-center">
        <div className="flex flex-col">
          <h1 className="text-3xl md:text-6xl text-white text-center">
            Who is watching?
            <div className="flex items-center justify-center gap-8 mt-10">
              <div onClick={() => router.push("/")}>
                <div className="group flex-row w-44 mx-auto">
                  <div className="w-44 h-44 rounded-md flex items-center justify-center border-2 border-transparent group-hover:cursor-pointer group-hover:border-white overflow-hidden">
                    <Image
                      draggable={false}
                      className="w-max h-max object-contain"
                      src="/images/default-green.png"
                      alt="Profile image"
                      height={172}
                      width={172}
                      // sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
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
    </>
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
