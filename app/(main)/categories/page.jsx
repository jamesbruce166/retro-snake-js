import React from 'react';
import Image from 'next/image';

import categoryData from '@data/categories';
import productData from '@data/products';

const { products } = productData;
const { categories } = categoryData;

const Categories = () => {
	return (
		<div className='relative overflow-hidden bg-white'>
			{categories.map((c) => (
				<div className='mx-auto max-w-screen-xl px-4 py-12 sm:px-6 lg:px-8'>
					<div className='grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 lg:items-stretch'>
						<div className='flex items-center rounded bg-gray-100 p-8'>
							<div className='mx-auto text-center lg:text-left'>
								<h2 className='text-2xl font-bold text-black'>
									{c.name}
								</h2>

								<p className='mt-4 max-w-[45ch] text-sm text-gray-700'>
									Lorem ipsum dolor sit amet consectetur
									adipisicing elit. Quos, cupiditate mollitia
									saepe vitae libero nobis.
								</p>

								<a
									href='#'
									className='mt-6 inline-block rounded bg-black px-6 py-3 text-sm text-white'
								>
									View the Range
								</a>
							</div>
						</div>

						<div className='grid grid-cols-2 gap-4 lg:col-span-2 lg:grid-cols-3 lg:py-12'>
							{products
								.filter((p) => p.categoryId == c.id)
								.slice(0, 3)
								.map((p) => (
									<a href='/shop' className='block'>
										<Image
											alt={p.name}
											src={p.imageSrc}
											className='aspect-square w-full rounded object-cover'
											width={200}
											height={200}
											objectFit='contain'
										/>

										<div className='mt-2'>
											<h3 className='font-medium'>
												{p.name}
											</h3>
										</div>
									</a>
								))}
						</div>
					</div>
				</div>
			))}
		</div>
	);
};

export default Categories;
