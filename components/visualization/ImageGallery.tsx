import React, { useState } from 'react';

const ImageGallery: React.FC<{ images: string[] }> = ({ images }) => {
    const [selectedImage, setSelectedImage] = useState<string | null>(null);

    if (images.length === 0) return null;

    return (
        <>
            <div className="mt-4 grid grid-cols-2 md:grid-cols-3 gap-2">
                {images.map((img, idx) => (
                    <div
                        key={idx}
                        className="group relative aspect-video bg-zinc-900 border border-zinc-800 cursor-pointer overflow-hidden hover:border-cyan-500/50 transition-colors"
                        onClick={() => setSelectedImage(img)}
                    >
                        <img src={img} alt={`Extracted ${idx}`} className="w-full h-full object-cover opacity-70 group-hover:opacity-100 transition-opacity" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-2">
                            <span className="text-[10px] text-cyan-400 font-mono uppercase">View Source</span>
                        </div>
                    </div>
                ))}
            </div>

            {/* Lightbox Modal */}
            {selectedImage && (
                <div className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-sm flex items-center justify-center p-4" onClick={() => setSelectedImage(null)}>
                    <div className="max-w-5xl w-full bg-[#0c0c0e] border border-zinc-800 p-2 rounded shadow-2xl" onClick={e => e.stopPropagation()}>
                        <div className="flex justify-between items-center mb-4 border-b border-zinc-800 pb-2">
                            <span className="text-xs font-mono text-cyan-500 uppercase tracking-widest">Image Analysis Viewer</span>
                            <div className="flex gap-4">
                                <button onClick={() => setSelectedImage(null)} className="text-zinc-500 hover:text-white text-xs uppercase font-bold">Minimize [-]</button>
                                <button onClick={() => setSelectedImage(null)} className="text-zinc-500 hover:text-red-500 text-xs uppercase font-bold">Close [x]</button>
                            </div>
                        </div>
                        <img src={selectedImage} alt="Full View" className="w-full h-auto max-h-[80vh] object-contain border border-zinc-800 bg-zinc-900" />
                    </div>
                </div>
            )}
        </>
    );
};

export default ImageGallery;
