import React from 'react'

const ContributorCard = ({ name, cohort, role, image, text }) => {
    return (
        <div className="flex overflow-hidden flex-col px-5 pt-5 pb-14 bg-white rounded-xl border border-solid shadow-2xl border-black border-opacity-20">
          <div className="flex gap-3 items-center self-start">
            <img
              loading="lazy"
              src={image}
              alt={`Profile picture of ${name}`}
              className="object-contain shrink-0 self-stretch my-auto rounded-lg aspect-[1.07] w-[72px]"
            />
            <div className="flex flex-col self-stretch my-auto w-[92px]">
              <div className="text-sm font-semibold text-black">{name}</div>
              <div className="flex flex-col mt-2.5 w-full text-xs text-gray-600">
                <div className="font-semibold">{cohort}</div>
                <div className="mt-1">{role}</div>
              </div>
            </div>
          </div>
          <div className="mt-6 text-xs font-light leading-5 text-black">
            {text}
          </div>
        </div>
      );
}

export default ContributorCard
