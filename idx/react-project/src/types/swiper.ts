// swiper Types:
export interface SwiperItem {
  id: number | null;
  name: string;
  url: string;
}

export type imageData = SwiperItem[]

export type EditObject = { inx: number | null; flag: boolean; }

export interface SwiperData {
  path: string;
  data: imageData;
}

export interface SwiperModule {
  name: SwiperModuleName,
  flag: boolean
}

export type ModulesArray = SwiperModule[]

export interface SwiperAdvSettings {
    spaceBetween:number,
    slidesPerView:number,
    modules: ModulesArray
}

export type SwiperModuleName =
| "Navigation"
| "Pagination"
| "Scrollbar"
| "A11y"
| "Autoplay"
| "Keyboard"
| "Zoom"
| "EffectFade"
| "EffectCube"
| "EffectFlip"
| "EffectCards"
