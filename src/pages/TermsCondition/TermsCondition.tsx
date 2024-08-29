import { Link } from "react-router-dom";
const TermsCondition = () => {
  return (
    <div className="p-10 md:p-20">
      <div className="">
        <div className="flex flex-col justify-center items-center bg-blue-100 dark:bg-blue-950 clip-path-wave relative py-6">
          <h1 className="text-xl font-semibold">Term & Conditions</h1>
          <p className="text-lg">Last update: 06 June, 2024</p>
        </div>
      </div>
      <div className="p-6">
        <h2 className="text-xl font-semibold mb-4">
          Welcome to Project Syncify!
        </h2>
        <p>
          These terms and conditions outline the rules and regulations for the
          use of Project Syncify services, located at ProjectSyncify.com.
        </p>
        <p className="mt-4">
          By accessing this website and our project management services, we
          assume you accept these terms and conditions. Do not continue to use
          Project Syncify if you do not agree to take all of the terms and
          conditions stated on this page.
        </p>
        <p className="mt-4">
          Most interactive websites use cookies to let us retrieve the user's
          details for each visit. Cookies are used by our website to enable the
          functionality of certain areas to make it easier for people visiting
          our website. Some of our affiliate/advertising partners may also use
          cookies.
        </p>
        <h3 className="text-lg font-semibold mt-6">License</h3>
        <p>
          Unless otherwise stated, Project Syncify and/or its licensors own the
          intellectual property rights for all material on Project Syncify. All
          intellectual property rights are reserved. You may access this from
          Project Syncify for your own personal use subject to restrictions set
          in these terms and conditions.
        </p>
        <ul className="pl-5 list-disc list-inside mt-4">
          <li>Republish material from Project Syncify</li>
          <li>Sell, rent, or sub-license material from Project Syncify</li>
          <li>Reproduce, duplicate, or copy material from Project Syncify</li>
          <li>Redistribute content from Project Syncify</li>
        </ul>
        <p className="mt-4">This Agreement shall begin on the date hereof.</p>
        <p className="mt-4">
          Parts of this website offer an opportunity for users to post and
          exchange opinions and information in certain areas of the website.
          Project Syncify does not filter, edit, publish, or review Comments
          prior to their presence on the website. Comments do not reflect the
          views and opinions of Project Syncify, its agents, and/or affiliates.
        </p>
        <p className="mt-4">
          Project Syncify reserves the right to monitor all Comments and to
          remove any Comments which can be considered inappropriate, offensive,
          or cause breach of these Terms and Conditions.
        </p>

        <p className="mt-4">
          You hereby grant Project Syncifyt a non-exclusive license to use,
          reproduce, edit, and authorize others to use, reproduce and edit any
          of your Comments in any and all forms, formats, or media.
        </p>

        <p className="mt-4">
          No use of Project Syncify's logo or other artwork will be allowed for
          linking absent a trademark license agreement.
        </p>

        <div className="flex justify-end mt-6">
          <Link to="/">
            <button className="bg-blue-500 text-white px-4 py-2 rounded mr-2">
              Accept
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default TermsCondition;
