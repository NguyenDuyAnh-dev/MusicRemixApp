export type RootStackParamList = {
    MainHome: undefined;
    
}
export type BottomTabParamList = {
    Favorite: undefined;
    PlayList: undefined;
    Singers: undefined;
    Songs: undefined;
    Home: undefined;
    UserProfile: undefined;
    
}

declare global {
    namespace ReactNavigation {
        interface RootParamList extends RootStackParamList { }
    }
}