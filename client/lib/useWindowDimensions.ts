import { useSyncExternalStore } from "react";

const subscribe = (onChange: () => void) => {
  window.addEventListener("resize", onChange);
  return () => window.removeEventListener("resize", onChange);
};

let cached = { height: 0, width: 0 };

// Trả cùng một object khi kích thước chưa đổi, nếu không useSyncExternalStore render vô hạn.
const read = () => {
  if (cached.width !== window.innerWidth || cached.height !== window.innerHeight) {
    cached = { height: window.innerHeight, width: window.innerWidth };
  }
  return cached;
};

/** Thay cho useWindowDimensions của React Native: kích thước cửa sổ, cập nhật khi resize. */
export function useWindowDimensions() {
  return useSyncExternalStore(subscribe, read);
}
