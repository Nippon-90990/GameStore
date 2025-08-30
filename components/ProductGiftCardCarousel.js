import { useEffect, useState } from 'react';
import { fetchFromStrapi } from '@/lib/strapi';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { Autoplay, Navigation } from 'swiper/modules';
import Image from 'next/image';
import Link from 'next/link';
import useCurrency from '@/hook/useCurrency';

export default function ProductGiftCardCarousel() {
    const { symbol } = useCurrency();
    const [products, setProducts] = useState([]);

    useEffect(() => {
        async function getProducts() {
            try {
                const res = await fetchFromStrapi('api/gift-cards?populate=*');
                // const resImage = await fetchFromStrapi('/products?populate=image');
                setProducts(res.data || []);
                // setProducts(resImage.data || []);
            } catch (error) {
                console.error('Failed to fetch products:', error);
            }
        }

        getProducts();
    }, []);

    return (
        <section className="my-10">
            <h2 className="text-xl font-bold mb-4 dark:text-white">Best Selling Gift Cards</h2>
            <Swiper
                // modules={[Navigation]}
                autoplay
                spaceBetween={20}
                slidesPerView={1}
                // navigation
                breakpoints={{
                    375: { slidesPerView: 2 },
                    768: { slidesPerView: 3 },
                    1024: { slidesPerView: 6 },
                }}
            // className='max-w-[1500px] mx-auto'
            >
                {products.map((item) => {
                    //   const { title, slug, price, coverImage } = item.attributes;

                    const getStrapiMedia = (url) => {
                        if (!url) return '';
                        if (url.startsWith('http')) return url;
                        return `${process.env.NEXT_PUBLIC_STRAPI_IMAGE_URL}${url}`;
                    };

                    const imgUrl = getStrapiMedia(item.image?.url);

                    return (
                        <SwiperSlide key={item.id} className='mb-2 mt-2'>
                            <Link
                                href={`/gift-card/${item.slug}`}
                                // className="block p-1 rounded-lg hover:shadow-md transition bg-white dark:bg-[#1a1a1a] relative max-w-[260px] mx-auto"
                                className="block p-1 rounded-lg bg-white dark:bg-[#1a1a1a] relative max-w-[260px] mx-auto shadow-sm dark:shadow-none hover:shadow-lg transition-transform duration-300 transform hover:-translate-y-1"
                            >
                                <div className="relative w-full aspect-[3/5] mb-1.5 rounded-md overflow-hidden">
                                    {/* {imageUrl && ( */}
                                    <Image
                                        src={imgUrl}
                                        alt={item.title}
                                        fill
                                        className="object-center"
                                    />
                                    {/* )} */}

                                    {/* Platform badge */}
                                    {item.platform && (
                                        <span className="absolute top-2 left-2 bg-black/80 text-white text-[10px] px-2 py-0.5 rounded uppercase">
                                            {item.platform}
                                        </span>
                                    )}

                                    {/* Discount ribbon */}
                                    {item.originalPrice && item.originalPrice > item.price && (
                                        <span className="absolute top-2 right-2 bg-red-600 text-white text-[10px] px-2 py-0.5 rounded">
                                            -{Math.round(((item.originalPrice - item.price) / item.originalPrice) * 100)}%
                                        </span>
                                    )}
                                </div>
                                <div className='bg-gray-100 dark:bg-black/30 backdrop-blur-sm px-1 py-1 rounded-b-md'>
                                    <h3 className="text-sm font-semibold line-clamp-2 px-3 mt-1 text-black">{item.title}</h3>
                                    <h3 className="text-sm font-semibold text-blue-600 px-3 mt-1">{item.card_region}</h3>
                                    <p className="text-sm text-gray-600 dark:text-gray-300 px-3 mt-2 mb-2">
                                        {symbol} {item.price}
                                    </p>
                                </div>
                            </Link>
                        </SwiperSlide>
                    );
                })}
            </Swiper>
        </section>
    );
}
