import { useDispatch, useSelector } from "react-redux";

// Custom hook to use throughout your app instead of plain `useDispatch`
export const useAppDispatch = () => useDispatch();

// Custom hook to use throughout your app instead of plain `useSelector`
export const useAppSelector = useSelector;
