import type { CustomNextPage } from "next";
import Head from "next/head";
import { CompanyLayout } from "src/component/CompanyLayout";
import { StudentList } from "src/component/StudentList";

const Home: CustomNextPage = () => {
  return (
    <>
      <Head>
        <title>Index Page</title>
      </Head>

      <div className="space-y-4">
        <h2>Index</h2>

        <main>
          <CompanyLayout>
            <StudentList />
          </CompanyLayout>
        </main>
      </div>
    </>
  );
};

export default Home;
