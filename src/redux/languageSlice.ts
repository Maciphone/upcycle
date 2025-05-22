
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "./store";

export type LanguageState = {
    language: string;
};  


const initialState: LanguageState = {
    language: "Hungarian - (Magyar)",
};  

const languageSlice = createSlice({
    name: "language", //store erre hivatkozik a reducer kulcs alatt
    initialState,
    reducers: {
        setLanguage: (state, action: PayloadAction<string>) => {
            state.language = action.payload;
        }
    },
});

export const selectedLanguage = (state: RootState) => state.language.language;
// meghívás => const lang = useSelector(selectLanguage);

export const { setLanguage,  } = languageSlice.actions;
export default languageSlice.reducer;