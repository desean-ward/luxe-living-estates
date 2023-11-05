import tw from "tailwind-styled-components";

export const CarouselContainer = tw.div` 
    ${({ type }) => type !== "listing" && "absolute bottom-0"}
    w-screen 
`;

export const ImageContainer = tw.section`
    h-[400px]
`;

export const Image = tw.img`
    object-cover w-full h-full 
`;

export const CopyImageUrl = tw.section`
    fixed 
    top-[13%] 
    right-[3%] 
    z-10 
    border 
    rounded-full 
    w-12 h-12 
    flex justify-center items-center bg-slate-100 
    cursor-pointer
`;