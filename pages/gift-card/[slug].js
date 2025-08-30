import Image from "next/image";
import React from "react";
import { useState, useEffect } from "react";
import { FaGlobeAmericas, FaMemory } from 'react-icons/fa';
import { SlCheck } from "react-icons/sl";
import { LuLaptopMinimalCheck } from "react-icons/lu";
import { RiShoppingBag3Fill } from "react-icons/ri";
import { MdOutlineAddShoppingCart, MdSupportAgent, MdVerified, MdSdStorage } from "react-icons/md";
import { AiFillThunderbolt } from "react-icons/ai";
import { GiProcessor } from "react-icons/gi";
import { BsFillLaptopFill, BsPciCardSound } from "react-icons/bs";
import { PiGraphicsCard } from "react-icons/pi";
import { fetchFromStrapi } from "@/lib/strapi";
import useCurrency from "@/hook/useCurrency";
import { useDispatch } from "react-redux";
import { addToCart } from "@/store/cartSlice";
import { useRouter } from "next/router";
import toast from "react-hot-toast";
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

export async function getServerSideProps({ params }) {
    const { slug } = params;

    const res = await fetchFromStrapi(`api/gift-cards?filters[slug][$eq]=${slug}&populate=*`);
    const product = res.data[0] || null;

    return {
        props: {
            product,
        },
    };
}

export default function ProductPage({ product }) {

    const dispatch = useDispatch();
    const router = useRouter();

    const handleAddToCart = () => {
        dispatch(addToCart({
            id: product.id,
            title: product.title,
            price: product.price,
            image: imgUrl,
            // add more if you want
        }));
        toast.success("Added to cart!");
    };

    const { symbol } = useCurrency();

    if (!product) return <div>Product not found.</div>;

    // const { attributes } = product;
    // const imageUrl = attributes?.image?.data?.attributes?.url
    //   ? `${process.env.NEXT_PUBLIC_STRAPI_IMAGE_URL}${attributes.image.data.attributes.url}`
    //   : null;

    const getStrapiMedia = (url) => {
        if (!url) return '';
        if (url.startsWith('http')) return url;
        return `${process.env.NEXT_PUBLIC_STRAPI_IMAGE_URL}${url}`;
    };

    const imgUrl = getStrapiMedia(product.image?.url);

    const discountPercent = Math.round(
        100 - (product.price / product.originalPrice) * 100
    );

    return (
        <div className="min-h-screen p-4 lg:p-6">
            <div className="max-w-[1500px] mx-auto grid grid-cols-1 md:grid-cols-1 lg:grid-cols-[260px_1fr_380px] gap-4 lg:gap-6 xl:gap-8">


                {/* Left: Cover Image - Fixed width for laptop and up */}
                <div className="w-full md:w-[260px] flex justify-center mx-auto">
                    <div className="w-full md:w-[260px]">
                        <Image
                            // src="http://localhost:1337/uploads/2f398399_fe1a_4364_8943_56f1ccb5b735_8df12031c6.webp"
                            src={imgUrl}
                            width={260}
                            height={260}
                            alt={product.title}
                            className="rounded w-full h-auto"
                            layout="responsive"
                        />
                    </div>
                </div>

                {/* Middle: Game Info - Flex column */}
                <div className="flex flex-col gap-2">   {/* mx-auto is the problem we need to fix it leater */}
                    <h1 className="text-lg lg:text-xl font-semibold dark:text-white text-justify tracking-tighter">
                        {product.title}
                    </h1>

                    {/* Tags + Ratings */}
                    <div className="flex flex-wrap items-center gap-2 text-xs mt-2.5">
                        <span className="bg-[#5539cc] px-2 py-0.5 rounded font-medium text-white">GAME</span>
                        <span className="bg-[#2a2a2a] px-2 py-0.5 rounded font-medium text-white">DIGITAL KEY</span>
                        <div className="flex items-center gap-1 text-yellow-400 ml-0 sm:ml-2">
                            ⭐⭐⭐⭐⭐ <span className="text-white">69 Ratings</span>
                        </div>
                    </div>

                    {/* Feature Grid - 2 columns on laptop */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 lg:gap-4 mt-4 lg:mt-6">
                        {/* India Activation */}
                        <div className="flex items-start gap-3">
                            <div className="bg-white dark:bg-[#1a1a1a] p-3 rounded-xl">
                                <SlCheck className="text-xl text-[#1cc54c]" />
                            </div>
                            <div>
                                <p className="text-xs lg:text-sm">
                                    Can be activated in <strong>India</strong>
                                </p>
                                <a href="#" className="text-[#359dff] text-xs">Check Restrictions</a>
                            </div>
                        </div>

                        {/* Region */}
                        <div className="flex items-start gap-3">
                            <div className="bg-white dark:bg-[#1a1a1a] p-3 rounded-xl text-white">
                                <FaGlobeAmericas className="text-xl text-[#359dff]" />
                            </div>
                            <div>
                                <p className="text-xs lg:text-sm">
                                    Region: <strong>{product.region}</strong>
                                </p>
                                <a href="#" className="text-[#359dff] text-xs">Check Region</a>
                            </div>
                        </div>

                        {/* Platform */}
                        <div className="flex items-start gap-3">
                            <div className="bg-white dark:bg-[#1a1a1a] p-3 rounded-xl text-white">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 32 32" fill="none">
                                    <rect width="32" height="32" rx="8" fill="#FAA41A" />
                                    <path d="M25.8815 18.6765H22.0481L21.4404 14.8549L19.1939 18.6497H18.7739C18.5188 18.2104 18.4179 17.5673 18.4179 17.1735C18.4179 16.5206 18.4648 15.8841 18.4648 15.0556C18.4648 13.9568 18.1418 13.367 17.28 13.1598V13.1273C19.1131 12.8724 19.9444 11.6595 19.9444 9.95193C19.9444 7.52591 18.3306 7 16.2156 7H10.525L8.12012 18.3882H11.1442L12.0193 14.2444H14.0294C15.1019 14.2444 15.5402 14.7691 15.5402 15.7732C15.5402 16.537 15.4606 17.1417 15.4606 17.7298C15.4606 17.9477 15.51 18.4535 15.6568 18.6497C15.6553 18.6497 17.8426 20.9562 17.8426 20.9562L15.9622 25L19.9844 22.6102L22.9816 24.9127L22.4221 21.0977L25.8815 18.6765ZM14.9332 12.1124H12.5296L13.1054 9.36687H15.3417C16.1379 9.36687 16.9661 9.57399 16.9661 10.5484C16.9661 11.7766 16.0228 12.1124 14.9332 12.1124Z" fill="black" />
                                    <path d="M20.0264 21.9386L17.225 23.6018L18.5072 20.848L16.948 19.2058H19.512L21.1338 16.4658L21.573 19.233H24.1166L21.8235 20.8376L22.2332 23.6353L20.0264 21.9386Z" fill="white" />
                                </svg>
                            </div>
                            <div>
                                <p className="text-xs lg:text-sm">
                                    Platform: <strong>Rockstar Games</strong>
                                </p>
                                <a href="#" className="text-[#359dff] text-xs">Activation Guide</a>
                            </div>
                        </div>

                        {/* Operating System */}
                        <div className="flex items-start gap-3">
                            <div className="bg-white dark:bg-[#1a1a1a] p-3 rounded-xl text-white">
                                <LuLaptopMinimalCheck className="text-xl text-[#359dff]" />
                            </div>
                            <div>
                                <p className="text-xs lg:text-sm">
                                    Works on: <strong>{product.workPlatform}</strong>
                                </p>
                                <a href="#" className="text-[#359dff] text-xs">System Requirements</a>
                            </div>
                        </div>
                    </div>

                    <div className="border-t border-neutral-800 mt-3 lg:mt-4"></div>

                    <div className="mt-4 lg:mt-6">
                        <h3 className="text-xs lg:text-sm text-white/60 mb-2">Edition:</h3>

                        <div className="flex flex-col sm:flex-row gap-3">
                            {/* Option 1 */}
                            <label className="w-full sm:w-[200px] cursor-pointer">
                                <input
                                    type="radio"
                                    name="edition"
                                    value="premium"
                                    className="peer sr-only"
                                    defaultChecked
                                />
                                <div className="p-3 rounded-xl border border-[#2e2e2e] bg-[#1a1a1a] peer-checked:border-purple-500">
                                    <div className="flex items-center justify-between">
                                        <span className="text-sm font-semibold text-white">Premium Online</span>
                                        <div className="w-4 h-4 rounded-full border-2 border-white/60 peer-checked:border-purple-500"></div>
                                    </div>
                                    <div className="mt-1 text-xs text-white/50">from ₹1,024.45</div>
                                </div>
                            </label>

                            {/* Option 2 */}
                            <label className="w-full sm:w-[200px] cursor-pointer">
                                <input
                                    type="radio"
                                    name="edition"
                                    value="standard"
                                    className="peer sr-only"
                                />
                                <div className="p-3 rounded-xl border border-[#2e2e2e] bg-[#1a1a1a] peer-checked:border-purple-500">
                                    <div className="flex items-center justify-between">
                                        <span className="text-sm font-semibold text-white">Standard</span>
                                        <div className="w-4 h-4 rounded-full border-2 border-white/60 peer-checked:border-purple-500"></div>
                                    </div>
                                    <div className="mt-1 text-xs text-white/50">from ₹1,092.34</div>
                                </div>
                            </label>
                        </div>
                    </div>
                </div>

                {/* Right: Pricing Box - Shows on xl screens or as last column on lg */}
                {/* <div className="w-full md:w-[380px] bg-[#111111] rounded-2xl p-4 space-y-4 text-white"> */}
                <div className="w-full max-w-md mx-auto bg-gradient-to-br from-[#111] to-[#1a1a1a] p-4 rounded-2xl shadow-lg border border-neutral-800 mt-6">
                    {/* Featured Offer */}
                    <div>
                        <p className="text-xs text-white/70 uppercase font-medium mb-1">Featured Offer</p>
                        <p className="text-xl lg:text-2xl font-bold">{symbol} {product.price}</p>
                        <div className="flex items-center gap-2 text-xs lg:text-sm text-white/60">
                            {/* <span className="line-through">{symbol} {product.originalPrice}</span> */}
                            {/* <span className="text-green-400 font-semibold">~{discountPercent}% off</span> */}
                        </div>
                    </div>

                    {/* Buy with Plus */}
                    <div className="bg-gradient-to-r from-[#2f1c4d] to-[#1d0e3e] rounded-lg p-3 mt-2.5">
                        <p className="text-xs lg:text-sm text-white/70">
                            Buy with <span className="text-purple-400 font-semibold">Gameway</span>
                        </p>
                        <p className="text-lg lg:text-xl font-bold">{product.plusprice}</p>
                    </div>

                    {/* Price note */}
                    <p className="text-xs text-white/40 mt-2">PRICE NOT FINAL</p>

                    {/* Buttons */}
                    <div className="flex gap-3 mt-4">
                        {/* Cart icon-only button */}
                        <button onClick={handleAddToCart} className="cursor-pointer bg-neutral-800 p-2 lg:p-3 rounded-lg text-white flex items-center justify-center">
                            <MdOutlineAddShoppingCart className="text-xl lg:text-2xl" />
                        </button>

                        {/* Buy Now full-width button */}
                        <button className="cursor-pointer flex items-center justify-center gap-2 bg-blue-600 text-white px-3 lg:px-4 py-2 lg:py-3 rounded-lg w-full font-semibold text-sm lg:text-base">
                            <RiShoppingBag3Fill className="text-xl lg:text-2xl" />
                            Buy now
                        </button>
                    </div>

                    {/* Explore Plus */}
                    <div className="bg-[#1e1e1e] rounded-xl p-3 flex items-center gap-2 mt-5 mb-5">
                        <div className="border border-purple-600 px-2 py-0.5 rounded text-purple-400 text-xs lg:text-sm font-medium">plus</div>
                        <p className="text-xs lg:text-sm text-white font-medium">Explore Plus Benefits</p>
                    </div>

                    {/* Feature Boxes */}
                    <div className="grid grid-cols-3 gap-0 mt-3">
                        {/* Instant Delivery */}
                        <div className="bg-neutral-800 px-3 py-2 lg:py-3 rounded-l-lg flex items-center justify-start gap-2">
                            <div className="">
                                <AiFillThunderbolt className="text-lg lg:text-xl text-yellow-500" />
                            </div>
                            <span className="text-xs lg:text-sm text-white">Instant Delivery</span>
                        </div>

                        {/* 24/7 Support */}
                        <div className="bg-neutral-800 px-3 py-2 lg:py-3 flex items-center justify-start gap-2">
                            <div className="">
                                <MdSupportAgent className="text-xl lg:text-3xl text-[#1cc54c]" />
                            </div>
                            <span className="text-xs lg:text-sm text-white">24/7 Support</span>
                        </div>

                        {/* Verified Sellers */}
                        <div className="bg-neutral-800 px-3 py-2 lg:py-3 rounded-r-lg flex items-center justify-start gap-2">
                            <div className="">
                                <MdVerified className="text-xl lg:text-3xl text-[#359dff]" />
                            </div>
                            <span className="text-xs lg:text-sm text-white">Verified Sellers</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Important Notice */}
            <div className="bg-[#1a1a1a] text-orange-500 p-3 lg:p-4 rounded-xl mt-4 lg:mt-6 text-xs lg:text-sm border border-[#2a2a2a] max-w-[1500px] mx-auto">
                <div className="flex flex-col lg:flex-row gap-1 lg:gap-2 xl:gap-5">
                    <div className="font-semibold text-orange-500 text-sm lg:text-base xl:text-lg">
                        Important Notice:
                    </div>
                    <div className="font-semibold text-orange-500 text-sm lg:text-base xl:text-lg">
                        Works only on PC. Activate the code on Rockstar Games Launcher.
                    </div>
                </div>
            </div>

            {/* Product Description */}
            <div className="bg-[#1a1a1a] p-3 lg:p-4 rounded-xl mt-4 lg:mt-6 text-xs lg:text-sm border border-[#2a2a2a] max-w-[1500px] mx-auto">
                <h2 className="text-lg lg:text-xl font-bold mb-3 lg:mb-4 dark:text-white">Product description</h2>
                <div className="font-semibold mb-5 text-lg">{product.title}</div>

                <div className="flex gap-3.5">
                    <div className="rounded-2xl bg-[#333] h-[35px] w-[150px] flex items-center justify-center">{product.gametag1}</div>
                    <div className="rounded-2xl bg-[#333] h-[35px] w-[150px] flex items-center justify-center">{product.gametag2}</div>
                    <div className="rounded-2xl bg-[#333] h-[35px] w-[150px] flex items-center justify-center">{product.gamemod}</div>
                </div>

                <div className="mt-5"><p className="text-[0.875rem] text-[#bfbfbf] leading-[20px] text-justify">{product.description}</p></div>

                <div className="mt-5 text-md font-bold">Key Features</div>

                <div className="mt-2 text-[0.875rem] text-[#bfbfbf] leading-[20px] text-justify">
                    <div className="ml-8 justify-center">
                        <ReactMarkdown
                            components={{
                                h2: ({ node, ...props }) => <h2 className="text-md font-bold mt-6 mb-2" {...props} />,    //importent but if you add h2 on heading description
                                strong: ({ node, ...props }) => <strong className="text-md font-bold text-white" {...props} />,    //importent but if you add h2 on heading description
                                ul: ({ node, ...props }) => <ul className="list-disc pl-0" {...props} />,   //importent
                                li: ({ node, ...props }) => <li className="mb-1" {...props} />,   //importent
                                p: ({ node, ...props }) => <p className="mb-2 leading-relaxed" {...props} />,   //importent
                            }}
                        >
                            {product?.descriptionkey}
                        </ReactMarkdown>
                    </div>
                </div>
            </div>

            {/* System Requirements */}
            

            {/* Other details */}
            
        </div>
    );
}