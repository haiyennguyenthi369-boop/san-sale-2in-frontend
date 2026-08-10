export default async function handler(req, res) {
  const rawUrl = req.query.url;

  if (!rawUrl) {
    return res.status(400).json({
      error: "Thiếu link Shopee",
    });
  }

  try {
    const inputUrl = new URL(rawUrl);

    const allowedHosts = [
      "vn.shp.ee",
      "s.shopee.vn",
      "shopee.vn",
      "www.shopee.vn",
    ];

    if (!allowedHosts.includes(inputUrl.hostname)) {
      return res.status(400).json({
        error: "Link không thuộc Shopee Việt Nam",
      });
    }

    // ================================
    // 1. LINK s.shopee.vn/an_redir
    // ================================
    if (
      inputUrl.hostname === "s.shopee.vn" &&
      inputUrl.pathname === "/an_redir"
    ) {
      const originLink = inputUrl.searchParams.get("origin_link");

      if (!originLink) {
        return res.status(400).json({
          error: "Link affiliate Shopee không có origin_link",
        });
      }

      const decodedOrigin = decodeURIComponent(originLink);

      return res.status(200).json({
        finalUrl: decodedOrigin,
      });
    }

    // ================================
    // 2. LINK SHOPEE GỐC
    // ================================
    if (
      inputUrl.hostname === "shopee.vn" ||
      inputUrl.hostname === "www.shopee.vn"
    ) {
      return res.status(200).json({
        finalUrl: inputUrl.toString(),
      });
    }

    // ================================
    // 3. LINK VN.SHP.EE
    // ================================
    const response = await fetch(inputUrl.toString(), {
      method: "GET",
      redirect: "manual",
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/120 Safari/537.36",
      },
    });

    const location = response.headers.get("location");

    if (location) {
      const redirectUrl = new URL(location, inputUrl);

      return res.status(200).json({
        finalUrl: redirectUrl.toString(),
      });
    }

    // Nếu Shopee không trả Location thì thử fetch theo redirect
    const followResponse = await fetch(inputUrl.toString(), {
      method: "GET",
      redirect: "follow",
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/120 Safari/537.36",
      },
    });

    const finalUrl = followResponse.url;

    if (!finalUrl) {
      return res.status(400).json({
        error: "Không tìm được link Shopee đích",
      });
    }

    return res.status(200).json({
      finalUrl,
    });
  } catch (error) {
    console.error("Resolve error:", error);

    return res.status(500).json({
      error: "Không thể xử lý link Shopee",
    });
  }
}
