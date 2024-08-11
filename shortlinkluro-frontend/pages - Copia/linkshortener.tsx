import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import axios from "axios";

const LinkShortener = () => {
    const [originalUrl, setOriginalUrl] = useState("");
    const [shortUrl, setShortUrl] = useState("");
    const [isButtonActive, setIsButtonActive] = useState(false);
    const router = useRouter();

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) {
            router.push("/login");
        }
    }, [router]);

    useEffect(() => {
        setIsButtonActive(originalUrl.trim().length > 0);
    }, [originalUrl]);

    const handleShortenLink = async () => {
        if (!originalUrl) {
            return;
        }

        try {
            const token = localStorage.getItem("token");

            if (!token) {
                router.push("/login");
                return;
            }

            const response = await axios.post("http://localhost:3000/shorten", 
                { originalUrl }, 
                {
                    headers: { 
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}`
                    }
                }
            );
            setShortUrl(`https://lu-ro.${response.data.shortCode}`);
        } catch (error) {
            console.error("Erro ao encurtar o link:", error);
            alert("Ocorreu um erro ao encurtar o link. Tente novamente.");
        }
    };

    return (
        <div className="container mx-auto p-4 max-w-md">
            <h1 className="text-3xl font-bold mb-6 text-center">Encurtador de URL</h1>
            <div className="mb-4">
                <input
                    type="text"
                    className="border p-2 w-full rounded"
                    placeholder="Digite o link original"
                    value={originalUrl}
                    onChange={(e) => setOriginalUrl(e.target.value)}
                />
            </div>
            <div className="mb-4">
                <button
                    className={`w-full py-2 px-4 rounded transition ${
                        isButtonActive 
                            ? "bg-blue-500 text-white hover:bg-blue-600" 
                            : "bg-gray-300 text-gray-500 cursor-not-allowed"
                    }`}
                    onClick={handleShortenLink}
                    disabled={!isButtonActive}
                >
                    ENCURTAR
                </button>
            </div>
            <div className="mb-4">
                <input
                    type="text"
                    className="border p-2 w-full rounded bg-gray-100"
                    placeholder="Link encurtado"
                    value={shortUrl}
                    readOnly
                />
            </div>
        </div>
    );
};

export default LinkShortener;