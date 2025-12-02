
import Link from "next/link";
import { Work_Sans } from "next/font/google";
import "../globals.css";

const workSans = Work_Sans({ subsets: ["latin"], weight: ["400", "700"] });

export const metadata = {
  title: {
    default: "eUG Form - University Enrollment Made Easy",
    template: "%s | eUG Form",
  },
  icon: "/favicon.ico",
  description:
    "An application to submit enrollment forms easily without hassle without any hardcopy",
  authors: [{ name: "Umair Imran", url: "https://umairimran.com" }],
  ketwords: [
    "eUG Form",
    "University of Agriculture",
    "Undergraduate Enrollment",
    "Digital Form Submission",
    "eUG",
    "UAF Enrollment",
    "Online Application",
    "Student Forms",
    "University Forms",
    "eUG Support",
  ],
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={workSans.className}>
        <header className="bg-white h-10 shadow-md">
          <nav className="w-full flex justify-between items-center">
            <div className="navbar bg-base-100 shadow-sm">
              <div className="navbar-start flex">
                <a className="btn btn-ghost text-xl text-secondary-gradient">
                  eEnrollment
                </a>
              </div>

              <div className="navbar-end">
                <div className="dropdown relative">
                  <div
                    tabIndex={0}
                    role="button"
                    className="btn btn-ghost btn-circle"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M4 6h16M4 12h16M4 18h7"
                      />
                    </svg>
                  </div>

                  <ul
                    tabIndex="-1"
                    className="absolute right-0 mt-3 w-60 bg-base-100 rounded-box shadow menu menu-sm dropdown-content z-50"
                  >
                    <li>
                      <Link href="/">Homepage</Link>
                    </li>
                    <li>
                      <Link href="/about">About</Link>
                    </li>
                    <li>
                      <Link href="/contact">Contact</Link>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </nav>
        </header>

        <main>{children}</main>

        <footer className="bg-gray-200 text-center p-4 mt-10 dark:bg-gray-800 dark:text-gray-200">
          © {new Date().getFullYear()} eUG Form. All rights reserved.
        </footer>
      </body>
    </html>
  );
}
