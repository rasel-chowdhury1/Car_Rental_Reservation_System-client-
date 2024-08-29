import React from "react";
import { Link } from "react-router-dom";
import { RiArrowRightUpFill } from "react-icons/ri";
const PrivacyPolicy = () => {
  return (
    <div>
      <div className="p-10 md:p-20">
        <div className="">
          <div className="flex flex-col justify-center items-center bg-blue-100 dark:bg-blue-950 clip-path-wave relative py-6">
            <h1 className="text-xl font-semibold">Privacy Policy</h1>
            <p className="text-lg">Last update: 06 June, 2024</p>
          </div>
        </div>
        <div className="p-3 md:p-6">
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
            Privacy Policy for Project Syncify!
          </h2>

          <p>
            At Project Syncify, accessible at ProjectSyncify.com, one of our
            main priorities is the privacy of our visitors. This Privacy Policy
            document contains types of information that is collected and
            recorded by Project Management Pro and how we use it.
          </p>
          <p className="mt-4">
            If you have additional questions or require more information about
            our Privacy Policy, do not hesitate to contact us through email at
            privacy@ProjectSyncify.com.
          </p>
          <p className="mt-4">
            This privacy policy applies only to our online activities and is
            valid for visitors to our website with regards to the information
            that they shared and/or collect in Project Syncify. This policy is
            not applicable to any information collected offline or via channels
            other than this website.
          </p>
          <p>How we use your information:</p>
          <ul className="pl-5 list-disc list-inside mt-4">
            <li>Providing and maintaining our service</li>
            <li>Notifying you about changes to our service</li>
            <li>
              Allowing you to participate in interactive features of our service
              when you choose to do so
            </li>
            <li>Providing customer support</li>
          </ul>
        </div>
        <div className="p-3 md:p-6">
          <p className=" font-normal flex items-center ">
            Some of advertisers on our site may use cookies and web beacons. Our
            advertising partners are listed below. Each of our advertising
            partners has their own Privacy Policy for their policies on user
            data. For easier access, we hyperlinked to their Privacy Policies
            below.
          </p>
        </div>
        <div className="flex justify-end ">
          <Link to="/">
            <button className="bg-orange-600 text-white px-4 py-2 rounded mr-2">
              I'm Understand
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
