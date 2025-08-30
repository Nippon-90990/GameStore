import Image from 'next/image';

export default function NewsletterSection() {
    return (
        <div className=" px-6 py-16 lg:px-24 flex flex-col lg:flex-row justify-between items-start lg:items-center">
            {/* Left: Newsletter Form */}
            <div className="w-full lg:w-1/2 mb-12 lg:mb-0">
                <h2 className="text-3xl md:text-4xl font-bold mb-6 leading-snug">
                    Subscribe to our newsletter and get<br />
                    updates on <span className="">best deals!</span>
                </h2>

                <div className="flex w-full max-w-xl gap-5">
                    <input
                        required
                        type="email"
                        placeholder="Enter your email"
                        className="flex-1 p-4 rounded-md focus:outline-none bg-[#1a1a1a]"
                    />
                    <button type='submit' style={{cursor: 'pointer'}} className="bg-blue-600 hover:bg-blue-700 px-6 rounded-md font-semibold">
                        Subscribe
                    </button>
                </div>

                <p className="text-sm text-gray-400 mt-4 max-w-lg">
                    By subscribing, you agree to receive commercial communications from driffle.com via email, including
                    personalized updates about products and services offered on the Driffle Marketplace.
                </p>

                <a
                    href="#"
                    className="inline-block mt-2 text-sm text-white font-semibold hover:underline"
                >
                    See more &rarr;
                </a>
            </div>

            {/* Right: Logo Grid */}
            <div className="w-full lg:w-1/2 flex justify-center lg:justify-end">
                <Image 
                // src={'https://steadfast-gem-fdb13b7584.media.strapiapp.com/unnamed_1_d52c38025a.png'}
                src={'https://playful-book-1c46d71b3d.media.strapiapp.com/unnamed_1_d52c38025a_3632a18adf.png'}
                height={250}
                width={350}
                />
                
            </div>
        </div>
    );
}





// import Image from 'next/image';

// const logos = [
//     '/brands/psn.svg',
//     '/brands/netflix.svg',
//     '/brands/tinder.svg',
//     '/brands/hm.svg',
//     '/brands/airbnb.svg',
//     '/brands/lara.svg',
//     '/brands/steam.svg',
//     '/brands/adidas.svg',
//     '/brands/person.svg',
//     '/brands/mario.svg',
//     '/brands/spotify.svg',
//     '/brands/f124.svg',
//     '/brands/kfc.svg',
//     '/brands/xbox.svg',
//     '/brands/mcd.svg',
// ];

// export default function NewsletterSection() {
//     return (
//         <div className="px-6 py-16 lg:px-24 flex flex-col lg:flex-row justify-between items-start lg:items-center">
//             {/* Left: Newsletter Form */}
//             <div className="w-full lg:w-1/2 mb-12 lg:mb-0">
//                 <h2 className="text-3xl md:text-4xl font-bold mb-6 leading-snug">
//                     Subscribe to our newsletter and get<br />
//                     updates on <span className="">best deals!</span>
//                 </h2>

//                 <div className="flex w-full max-w-lg">
//                     <input
//                         type="email"
//                         placeholder="Enter your email"
//                         className="flex-1 p-4 rounded-l-md focus:outline-none bg-[#1a1a1a]"
//                     />
//                     <button className="bg-blue-600 hover:bg-blue-700 px-6 rounded-r-md font-semibold">
//                         Subscribe
//                     </button>
//                 </div>

//                 <p className="text-sm text-gray-400 mt-4 max-w-lg">
//                     By subscribing, you agree to receive commercial communications from driffle.com via email, including
//                     personalized updates about products and services offered on the Driffle Marketplace.
//                 </p>

//                 <a
//                     href="#"
//                     className="inline-block mt-2 text-sm text-white font-semibold hover:underline"
//                 >
//                     See more &rarr;
//                 </a>
//             </div>

//             {/* Right: Logo Grid */}
//             {/* <div className="w-full lg:w-1/2 flex justify-center lg:justify-end"> */}
//                 <div className="sc-1e341797-2 eHAmuB">
//                     <div className="sc-c46e5164-23 fCzDDc">
//                         <div className="sc-c46e5164-25 jZMdJd">
//                             <div className="sc-c46e5164-24 fLEZPc">
//                                 <span style={{boxSizing: 'border-box', display: 'block', overflow: 'hidden', width: 'initial', height: 'initial', background: 'none', opacity: '1', border: '0px', margin: '0px', padding: '0px', position: 'absolute', inset: '0px',}}>
//                                     <Image
//                                         alt="psn"
//                                         src="https://driffle.comhttps://driffle.com/icons/newsletter-section/newsletter-delight-psn.svg"
//                                         layout="fill"
//                                         objectFit="contain"
//                                     />
//                                 </span>
//                             </div>
//                             <div className="sc-c46e5164-24 fLEZPc">
//                                 <Image
//                                     alt="netflix"
//                                     src="https://driffle.com/icons/newsletter-section/nd-netflix.svg"
//                                     layout="fill"
//                                     objectFit="contain"
//                                 />
//                             </div>
//                             <div className="sc-c46e5164-28 dXonOA">
//                                 <span style={{boxSizing: 'border-box', display: 'block', overflow: 'hidden', width: 'initial', height: 'initial', background: 'none', opacity: '1', border: '0px', margin: '0px', padding: '0px', position: 'absolute', inset: '0px',}}>
//                                     <Image
//                                         alt="tinder"
//                                         src="https://driffle.com/icons/newsletter-section/nd-tinder.svg"
//                                         layout="fill"
//                                         objectFit="contain"
//                                     />
//                                 </span>
//                             </div>
//                             <div className="sc-c46e5164-24 fLEZPc">
//                                 <Image
//                                     alt="hnm"
//                                     src="/icons/newsletter-section/nd-hnm.svg"
//                                     layout="fill"
//                                     objectFit="contain"
//                                 />
//                             </div>
//                         </div>
//                         <div style={{ display: 'flex', gap: '10px' }}>
//                             <div>
//                                 <div className="sc-c46e5164-26 jFfECc">
//                                     <div>
//                                         <div className="sc-c46e5164-24 fLEZPc">
//                                             <Image
//                                                 alt="airbnb"
//                                                 src="/icons/newsletter-section/nd-airbnb.svg"
//                                                 layout="fill"
//                                                 objectFit="contain"
//                                             />
//                                         </div>
//                                         <div className="sc-c46e5164-24 fLEZPc">
//                                             <Image
//                                                 alt="spotify"
//                                                 src="/icons/newsletter-section/nd-spotify.svg"
//                                                 layout="fill"
//                                                 objectFit="contain"
//                                             />
//                                         </div>
//                                     </div>
//                                     <div className="sc-c46e5164-29 kGEJQZ">
//                                         <Image
//                                             alt="gta"
//                                             src="/icons/newsletter-section/nd-gta.svg"
//                                             layout="fill"
//                                             objectFit="contain"
//                                         />
//                                     </div>
//                                 </div>
//                                 <div className="sc-c46e5164-28 dXonOA">
//                                     <Image
//                                         alt="kfc"
//                                         src="/icons/newsletter-section/nd-kfc.svg"
//                                         layout="fill"
//                                         objectFit="contain"
//                                     />
//                                 </div>
//                             </div>
//                             <div>
//                                 <div className="sc-c46e5164-27 cqDGkm">
//                                     <div className="sc-c46e5164-24 fLEZPc">
//                                         <Image
//                                             alt="steam"
//                                             src="/icons/newsletter-section/nd-steam.svg"
//                                             layout="fill"
//                                             objectFit="contain"
//                                         />
//                                     </div>
//                                     <div className="sc-c46e5164-28 dXonOA">
//                                         <Image
//                                             alt="adidas"
//                                             src="/icons/newsletter-section/nd-adidas.svg"
//                                             layout="fill"
//                                             objectFit="contain"
//                                         />
//                                     </div>
//                                 </div>
//                                 <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
//                                     <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
//                                         <div className="sc-c46e5164-28 dXonOA">
//                                             <Image
//                                                 alt="mario"
//                                                 src="/icons/newsletter-section/nd-mario.svg"
//                                                 layout="fill"
//                                                 objectFit="contain"
//                                             />
//                                         </div>
//                                         <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
//                                             <div className="sc-c46e5164-24 fLEZPc">
//                                                 <Image
//                                                     alt="xbox"
//                                                     src="/icons/newsletter-section/nd-xbox.svg"
//                                                     layout="fill"
//                                                     objectFit="contain"
//                                                 />
//                                             </div>
//                                             <div className="sc-c46e5164-24 fLEZPc">
//                                                 <Image
//                                                     alt="mcd"
//                                                     src="/icons/newsletter-section/nd-mcd.svg"
//                                                     layout="fill"
//                                                     objectFit="contain"
//                                                 />
//                                             </div>
//                                         </div>
//                                     </div>
//                                     <div className="sc-c46e5164-29 kGEJQZ">
//                                         <Image
//                                             alt="f1"
//                                             src="/icons/newsletter-section/nd-f1.svg"
//                                             layout="fill"
//                                             objectFit="contain"
//                                         />
//                                     </div>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             {/* </div> */}
//         </div>
//     );
// }