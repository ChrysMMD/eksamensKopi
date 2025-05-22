'use client';

import React from "react";


export default function ArtCard({ image_thumbnail, titles, artist }) {
    return (
        <div className="flex flex-col items-center p-4 rounded-xl w-60 h-80 bg-white shadow-md hover:shadow-lg transition">
            <div className="w-60 h-60 overflow-hidden">
            <img
                src={image_thumbnail}
                alt={titles?.[0]?.title || "Værk uden titel"}
                className="w-full h-full object-cover"
            />
            </div>
            <p className="text-center mt-2 w-full px-2">
                <strong className="truncate overflow-hidden whitespace-nowrap block">{titles?.[0]?.title || "Ukendt titel"}</strong>
            </p>
            <p>{artist?.[0] || "Ukendt kunstner"}</p>
        </div>
    );
}
