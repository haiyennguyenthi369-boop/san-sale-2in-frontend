import { useState } from "react";
import {
  Clipboard,
  Copy,
  ExternalLink,
  Link2,
  Sparkles,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";

const AFFILIATE_ID = "17312880098";
export default function App() {
  const [inputUrl, setInputUrl] = useState("");
  const [resultUrl, setResultUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");

  const showMessage = (text, type) => {
    setMessage(text);
    setMessageType(type);
  };

  const pasteFromClipboard = async () => {
    try {
      const text = await navigator.clipboard.readText();

      if (!text) {
        showMessage("Clipboard đang trống.", "error");
        return;
      }

      setInputUrl(text.trim());
      showMessage("Đã dán link.", "success");
    } catch {
      showMessage("Không đọc được clipboard. Hãy dán link thủ công.", "error");
    }
  };

  const AFFILIATE_ID = "17312880098";

const convertLink = () => {
  const url = inputUrl.trim();

  setMessage("");
  setResultUrl("");

  if (!url) {
    showMessage("Hãy dán link Shopee trước nha.", "error");
    return;
  }

  try {
    const parsedUrl = new URL(url);

    if (!parsedUrl.hostname.endsWith("shopee.vn")) {
      showMessage("Vui lòng nhập link Shopee Việt Nam nha.", "error");
      return;
    }

    const cleanUrl = parsedUrl.origin + parsedUrl.pathname;
    const encodedUrl = encodeURIComponent(cleanUrl);

    const affiliateUrl =
      `https://s.shopee.vn/an_redir?origin_link=${encodedUrl}&affiliate_id=${AFFILIATE_ID}`;

    setResultUrl(affiliateUrl);
    showMessage("Chuyển đổi thành công 🎉", "success");
  } catch (error) {
    console.error(error);
    showMessage("Link Shopee không hợp lệ nha.", "error");
  }
};

  const copyResult = async () => {
    if (!resultUrl) return;

    try {
      await navigator.clipboard.writeText(resultUrl);
      showMessage("Đã sao chép link.", "success");
    } catch {
      showMessage("Không thể sao chép link.", "error");
    }
  };

  const buyNow = () => {
    if (!resultUrl) return;

    window.open(resultUrl, "_blank", "noopener,noreferrer");
  };

  return (
    <div className="page">
<div className="star-background">
  <span className="star star-1"></span>
  <span className="star star-2"></span>
  <span className="star star-3"></span>
  <span className="star star-4"></span>
  <span className="star star-5"></span>
  <span className="star star-6"></span>
  <span className="star star-7"></span>
  <span className="star star-8"></span>
  <span className="star star-9"></span>
  <span className="star star-10"></span>
  <span className="star star-11"></span>
  <span className="star star-12"></span>
  <span className="star star-13"></span>
  <span className="star star-14"></span>
  <span className="star star-15"></span>
  <span className="star star-16"></span>
  <span className="star star-17"></span>
  <span className="star star-18"></span>
  <span className="star star-19"></span>
  <span className="star star-20"></span>
  <span className="star star-21"></span>
  <span className="star star-22"></span>
</div>
      <main className="container">
        {/* Thêm flex để căn hàng ngang cho header */}
        <header
          className="header"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "12px",
          }}
        >
          {/* Thêm .jpg vào đường dẫn src */}
          <img
            src="/gauiu.jpg"
            alt="gauiu"
            style={{
              width: "48px",
height: "48px",
              objectFit: "cover",
              borderRadius: "12px",
              display: "block",
              flexShrink: 0,
            }}
          />

          <div className="brand">
            <div className="main-title">SĂN SALE CÙNG 2IN</div>
          </div>

          <div className="sparkle">
            <Sparkles size={18} />
          </div>
        </header>

        <section className="card">
          <div className="intro">
            <h1>
              Dán link sản phẩm để áp
              <br />
              mã toàn sàn 💓
            </h1>
          </div>

          <div className="input-box">
            <label>Link Shopee</label>

            <input
              value={inputUrl}
              onChange={(e) => setInputUrl(e.target.value)}
              placeholder="Dán link shopee ở đây nha"
            />

            <button className="paste-button" onClick={pasteFromClipboard}>
              <Clipboard size={18} />
              Dán từ clipboard
            </button>

            <button
              className="convert-button"
              onClick={convertLink}
              disabled={loading}
            >
              {loading ? "Đang chuyển đổi..." : "Chuyển đổi"}
            </button>

            {message ? (
              <div
                className={
                  messageType === "success"
                    ? "message success"
                    : "message error"
                }
              >
                {messageType === "success" ? (
                  <CheckCircle2 size={18} />
                ) : (
                  <AlertCircle size={18} />
                )}
                <span>{message}</span>
              </div>
            ) : null}
          </div>

          {resultUrl ? (
            <div className="result-box">
              <div className="result-title">
                <Link2 size={17} />
                Link kết quả
              </div>

              <div className="result-buttons">
                <button className="copy-button" onClick={copyResult}>
                  <Copy size={18} />
                  Sao chép
                </button>

                <button className="buy-button" onClick={buyNow}>
                  <ExternalLink size={18} />
                  Mua ngay
                </button>
              </div>
            </div>
          ) : null}
        </section>

        <footer>
          Vận hành bởi <b>2IN nha hehe</b>
        </footer>
      </main>
    </div>
  );
}
