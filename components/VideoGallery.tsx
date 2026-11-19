"use client";
import { useState } from "react";

export default function VideoGallery({ videos }: { videos: { id: string; titulo: string }[] }) {
  const [atual, setAtual] = useState(0);
  return (
    <div>
      <div className="player">
        <iframe
          src={`https://www.youtube.com/embed/${videos[atual].id}`}
          title={videos[atual].titulo}
          allowFullScreen
        />
      </div>
      <div className="miniaturas">
        {videos.map((v, i) => (
          <button key={v.id} onClick={() => setAtual(i)} className={i === atual ? "ativo" : ""}>
            <img src={`https://img.youtube.com/vi/${v.id}/mqdefault.jpg`} alt="" />
            <span>{v.titulo}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
