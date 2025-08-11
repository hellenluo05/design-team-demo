'use client'
import React from "react";

const coDirectors = [
  {
    name: "Diana Luu",
    classYear: "Class of 2028",
    email: "diana.luu@princeton.edu",
    major: "Molecular Biology"
  },
  {
    name: "Hellen Luo",
    classYear: "Class of 2028",
    email: "hellen.luo@princeton.edu",
    major: "Computer Science (A.B.)"
  },
];

const members = [
  { name: "Lorem Ipsum" },
  { name: "Dolor Sit Amet" },
  { name: "Consectetur Adipiscing" },
  { name: "Elit Sed Do" },
  { name: "Eiusmod Tempor" },
  { name: "Incididunt Ut" },
];

export default function Team() {
  return (
    <section id="team" className="flex flex-col items-center justify-center py-10">
      <h2 className="text-4xl font-bold mb-8 text-center">Team</h2>
      <div className="w-full max-w-2xl flex flex-col items-center">
        {/* Co-Directors */}
        <h3 className="text-2xl font-semibold mb-4 text-center">Co-Directors</h3>
        <div className="flex flex-row items-start justify-center gap-22 mb-10 w-full">
          {coDirectors.map((director, idx) => (
            <div className="flex flex-col items-center" key={director.email}>
              <span className="text-xl font-medium">{director.name}</span>
              <span className="text-base">{director.classYear}</span>
              <span className="text-sm">{director.major}</span>
              <span className="text-sm">{director.email}</span>
            </div>
          ))}
        </div>
        {/* Members */}
        <h3 className="text-2xl font-semibold mb-4 text-center">Members</h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 w-full">
          {members.map((member, idx) => (
            <div
              key={idx}
              className="flex flex-col items-center justify-center text-lg text-center"
            >
              {member.name}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}