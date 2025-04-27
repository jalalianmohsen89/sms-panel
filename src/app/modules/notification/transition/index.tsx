import React, { useState, useTransition, ChangeEvent } from "react";

// ایجاد یک لیست بزرگ برای شبیه‌سازی عملیات سنگین
const bigList = Array.from(
  { length: 20000 },
  (_, index) => ` آیتم شماره لیست ${index + 1}`,
);

const TransitionExample = () => {
  // --- مثال بدون useTransition ---
  const [inputValueWithoutTransition, setInputValueWithoutTransition] =
    useState("");
  const [filteredListWithoutTransition, setFilteredListWithoutTransition] =
    useState(bigList);

  const handleChangeWithoutTransition = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    setInputValueWithoutTransition(value);
    // فیلتر کردن لیست به صورت مستقیم (باعث مسدود شدن UI می‌شود)
    const filtered = bigList.filter((item) => item.includes(value));

    setFilteredListWithoutTransition(filtered);
  };

  // --- مثال با useTransition ---
  const [isPending, startTransition] = useTransition();
  const [inputValueWithTransition, setInputValueWithTransition] = useState("");
  const [filteredListWithTransition, setFilteredListWithTransition] =
    useState(bigList);

  const handleChangeWithTransition = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    setInputValueWithTransition(value);
    // استفاده از startTransition برای به‌روزرسانی state بدون مسدود کردن UI
    startTransition(() => {
      const filtered = bigList.filter((item) => item.includes(value));

      setFilteredListWithTransition(filtered);
    });
  };

  return (
    <div style={{ display: "flex", gap: "40px", padding: "20px" }}>
      {/* بخش بدون useTransition */}
      <div style={{ flex: 1 }}>
        <h2>بدون useTransition</h2>
        <p>
          تایپ کردن در این ورودی ممکن است باعث کندی یا مسدود شدن رابط کاربری
          شود، زیرا فیلتر کردن لیست بزرگ به صورت همزمان انجام می‌شود.
        </p>
        <input
          type="text"
          value={inputValueWithoutTransition}
          onChange={handleChangeWithoutTransition}
          placeholder="جستجو در لیست بزرگ (کند)"
          style={{ width: "100%", padding: "8px", marginBottom: "10px" }}
        />
        <ul
          style={{
            maxHeight: "300px",
            overflowY: "auto",
            border: "1px solid #ccc",
            padding: "10px",
          }}
        >
          {filteredListWithoutTransition.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </div>

      {/* بخش با useTransition */}
      <div style={{ flex: 1 }}>
        <h2>با useTransition</h2>
        <p>
          تایپ کردن در این ورودی روان‌تر است. به‌روزرسانی لیست در پس‌زمینه انجام
          می‌شود و وضعیت `isPending` نشان می‌دهد که عملیات در حال انجام است.
        </p>
        <input
          type="text"
          value={inputValueWithTransition}
          onChange={handleChangeWithTransition}
          placeholder="جستجو در لیست بزرگ (روان)"
          style={{ width: "100%", padding: "8px", marginBottom: "10px" }}
        />
        {isPending && (
          <p style={{ color: "orange" }}>در حال بارگذاری لیست...</p>
        )}
        <ul
          style={{
            maxHeight: "300px",
            overflowY: "auto",
            border: "1px solid #ccc",
            padding: "10px",
            opacity: isPending ? 0.5 : 1,
          }}
        >
          {filteredListWithTransition.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default TransitionExample;
