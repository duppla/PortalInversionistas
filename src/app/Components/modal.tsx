import React from 'react';
import Card from './card';
import Button from './button';
import { XMarkIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import Image from 'next/image';



interface Props {
    id: string
    title?: string;
    body?: React.ReactNode;
    image?: string;
    textButton?: string;
    textLink?: string;
    buttonUrl?: string;
    linkUrl?: string;
    onAccept: () => void;
    toggleModal: () => void;
}


function Modal({ id, title, body, image, textButton, textLink, linkUrl, buttonUrl = "#", toggleModal, onAccept }: Readonly<Props>) {


    return (
        <div className="fixed top-0 right-0 bottom-0 left-0 z-50 flex items-center justify-center w-full h-full bg-gray-900 bg-opacity-50">
            <div className="relative p-4 w-full max-w-2xl">
                <Card color='light' shadowColor='#232b8522' >
                    <div className="flex items-center p-2 md:p-5  ">
                        <button onClick={toggleModal} type="button" className=" bg-transparent hover:bg-sonador-darker hover:text-blue-200 rounded-lg text-sm me-auto inline-flex " data-modal-hide="default-modal">
                            <XMarkIcon className="h-8 w-8 text-white" />
                        </button>
                    </div>
                    <div className="flex justify-center items-center px-2">
                        <h3 className="text-white text-center font-nunito font-bold text-2xl items-center leading-8">
                            {title}
                        </h3>
                    </div>
                    <div className="p-2 md:p-5 space-y-4">
                        <div className="flex justify-center items-center ">
                            <Image src={image ?? ''} alt='' width={208} height={98} className={` mt-4 space-y-6 min-w-180px max-w-[360px]`} />
                        </div>
                        <div className="flex justify-center items-center ">
                            <p className=" font-nunito text-center text-lg text-white">{body}</p>
                        </div>
                    </div>
                    <div className="flex flex-col justify-center items-center p-4 md:p-5 gap-4">
                        <Link href={buttonUrl}>
                            <Button color='ilusion' style={{}} id={id} onClick={() => { onAccept(); toggleModal(); }} >{textButton}</Button>
                        </Link>
                        {linkUrl && linkUrl.startsWith('/') ? (
                            <Link href={linkUrl}>
                                <p className="text-white text-center font-mukta font-light text-sm underline">{textLink}</p>
                            </Link>
                        ) : (
                            <a href={linkUrl} target="_self" rel="noopener noreferrer">
                                <p className="text-white text-center font-mukta font-light text-sm underline">{textLink}</p>
                            </a>
                        )}

                    </div>
                </Card >
            </div>
        </div>
    );
}

export default Modal;
