import React, {
  useState,
  useTransition,
  useDeferredValue,
  useMemo,
} from "react";

// تابع کمکی برای تولید لیست بزرگ داده
const generateListItems = (count: number) => {
  const items = [];

  for (let i = 0; i < count; i++) {
    items.push(`آیتم شماره ${i + 1}`);
  }

  return items;
};

const largeList = generateListItems(20000); // تولید لیست بزرگ

const FilteredList = ({ query, label }: { query: string; label: string }) => {
  const filteredItems = useMemo(
    () =>
      largeList.filter((item) =>
        item.toLowerCase().includes(query.toLowerCase()),
      ),
    [query],
  );

  return (
    <div
      style={{
        maxHeight: "300px",
        overflowY: "auto",
        border: "1px solid #ccc",
        padding: "10px",
        marginTop: "5px",
      }}
    >
      <h4>{label}</h4>
      <ul>
        {filteredItems.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    </div>
  );
};

const Report = () => {
  const [inputValueDeferred, setInputValueDeferred] = useState("");
  const [inputValueDirect, setInputValueDirect] = useState("");
  const [isPending] = useTransition();
  // مقدار با تاخیر برای لیست بهینه شده
  const deferredQuery = useDeferredValue(inputValueDeferred);

  const handleInputChangeDeferred = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const newValue = event.target.value;
    // به‌روزرسانی فوری ورودی کاربر برای فیلد اول

    setInputValueDeferred(newValue);
    // نیازی به startTransition نیست چون useDeferredValue کار را انجام می‌دهد
  };

  const handleInputChangeDirect = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const newValue = event.target.value;
    // به‌روزرسانی مستقیم ورودی کاربر برای فیلد دوم

    setInputValueDirect(newValue);
  };

  return (
    <div>
      <h1>مقایسه عملکرد با و بدون useDeferredValue</h1>

      <p>
        در این مثال، دو لیست مشابه با قابلیت جستجو وجود دارد. لیست سمت راست از
        `useDeferredValue` برای بهینه‌سازی استفاده می‌کند، در حالی که لیست سمت
        چپ به طور مستقیم با مقدار ورودی کاربر فیلتر می‌شود.
      </p>
      <p>
        هنگام تایپ سریع در هر دو فیلد جستجو، تفاوت در روانی و پاسخگویی رابط
        کاربری را مشاهده کنید. فیلد جستجوی سمت راست (بهینه شده) باید روان‌تر
        باشد، زیرا به‌روزرسانی لیست به تعویق می‌افتد تا تایپ کاربر مسدود نشود.
      </p>

      <div style={{ display: "flex", gap: "20px", marginTop: "20px" }}>
        {/* بخش بدون بهینه‌سازی */}
        <div style={{ flex: 1 }}>
          <h2>بدون useDeferredValue (مستقیم)</h2>
          <input
            type="text"
            value={inputValueDirect}
            onChange={handleInputChangeDirect}
            placeholder="جستجو (بدون بهینه‌سازی)..."
            style={{ padding: "8px", marginBottom: "10px", width: "100%" }}
          />
          {/* نمایش لیست بدون تاخیر */}
          <FilteredList query={inputValueDirect} label="لیست مستقیم" />
        </div>

        {/* بخش بهینه شده با useDeferredValue */}
        <div style={{ flex: 1 }}>
          <h2>با useDeferredValue (بهینه شده)</h2>
          <input
            type="text"
            value={inputValueDeferred}
            onChange={handleInputChangeDeferred}
            placeholder="جستجو (بهینه شده)..."
            style={{ padding: "8px", marginBottom: "10px", width: "100%" }}
          />
          {/* نمایش وضعیت در حال انتظار فقط برای لیست بهینه شده */}
          {isPending && <p>در حال بارگذاری لیست بهینه شده...</p>}
          {/* نمایش لیست با مقدار تاخیری */}
          <FilteredList
            query={deferredQuery}
            label="لیست بهینه شده (Deferred)"
          />
        </div>
      </div>
    </div>
  );
};

export default Report;
