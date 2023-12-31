import Link from "next/link";
import tw from "tailwind-styled-components";

export const UpdateListingContainer = tw.main`
    p-3
    max-w-7xl
    mx-auto
`;

export const UpdateListingHeader = tw.h1`
    text-3xl
    font-smibold 
    text-center 
    my-7
`;

export const UpdateListingForm = tw.form`
    flex flex-col lg:flex-row
    gap-16
    w-[80vw] lg:w-full
    mx-auto
`;

export const FormInputSection = tw.section`
    flex flex-col 
    gap-4
    flex-1
    mb-8
`;

export const FormInput = tw.input`
    border border-slate-400
    p-3
    rounded-lg 

    ${({ type }) =>
      type === "checkbox" &&
      `
        cursor-pointer
        w-5 h-5
    `}

    ${({ type }) =>
      type === "number" &&
      `
        cursor-pointer
        w-24 h-16
    `}

    ${({ type }) =>
      type === "file" || type === 'text' &&
      `
        w-full
    `}


    ${({ name }) => name === "price" && `w-fit`}
`;

export const FormTextArea = tw.textarea`
    w-full
    border
    border-slate-400 
    p-3
    rounded-lg 
    resize-none
`;

export const FormOptionsSection = tw.section`
    flex flex-col gap-4
`;

export const FormAmenities = tw.section`
    flex gap-6
    flex-wrap
`;

export const Option = tw.section`
    flex items-center gap-2 
    max-w-max
`;

export const BedBathSection = tw.section`
    flex gap-6
`;

export const PricesSection = tw.section`
    flex flex-col flex-1 gap-6 flex-wrap
`;

export const ImagesSection = tw.section`
    flex flex-col flex-1 gap-6 
`;

export const FormButton = tw.button`
    bg-slate-700
    text-white 
    rounded-lg 
    py-3 px-6
    uppercase 
    hover:opacity-95
    disabled:opacity-80

    ${({ type }) =>
      type === "button" &&
      `
      bg-[transparent]
      text-slate-700 hover:text-white
      border border-slate-400
      hover:bg-slate-700
    `}
`;
