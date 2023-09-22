export enum TextVariants {
  Mark_Pro_12pt_Regular = 'Mark_Pro_12pt_Regular',
  Mark_Pro_8pt_Regular = 'Mark_Pro_8pt_Regular',
  Mark_Pro_4pt_Regular = 'Mark_Pro_4pt_Regular',
  Mark_Pro_12pt_Bold = 'Mark_Pro_12pt_Bold',
  Noto_Sans_12pt_Bold = 'Noto_Sans_12pt_Bold',
  Noto_Sans_10pt_Bold = 'Noto_Sans_10pt_Bold',
  Mark_Pro_14pt_Bold = 'Mark_Pro_14pt_Bold',
  Mark_Pro_16pt_Bold = 'Mark_Pro_16pt_Bold',
  Mark_Pro_20pt_Regular = 'Mark_Pro_20pt_Regular',
  Mark_Pro_20pt_Bold = 'Mark_Pro_20pt_Bold',
  Mark_Pro_24pt_Bold = 'Mark_Pro_24pt_Bold',
  Mark_Pro_26pt_Bold = 'Mark_Pro_26pt_Bold',
  Mark_Pro_32pt_Bold = 'Mark_Pro_32pt_Bold',
  Mark_Pro_56pt_Bold = 'Mark_Pro_56pt_Bold',
  Mark_Pro_CAPS_14pt_Bold = 'Mark_Pro_CAPS_14pt_Bold',
  Mark_Pro_18pt_Regular = 'Mark_Pro_18pt_Regular',
  Mark_Pro_36pt_Bold = 'Mark_Pro_36pt_Bold',
  Noto_Sans_14pt_Bold = 'Noto_Sans_14pt_Bold',
  Noto_Sans_16pt_Bold = 'Noto_Sans_16pt_Bold',
  Noto_Sans_18pt_Bold = 'Noto_Sans_18pt_Bold',
  Noto_Sans_16pt_Bold_CAPS = 'Noto_Sans_16pt_Bold_CAPS',
  Noto_Sans_Bold_28pt_Bold = 'Noto_Sans_Bold_28pt_Bold',
  Noto_Sans_24pt_Bold = 'Noto_Sans_24pt_Bold',
  Noto_Sans_10pt_Bold_CAPS = 'Noto_Sans_10pt_Bold_CAPS',
  Noto_Sans_10pt_Regular = 'Noto_Sans_10pt_Regular',
  Noto_Sans_12pt_Regular = 'Noto_Sans_12pt_Regular',
  Noto_Sans_14pt_Regular = 'Noto_Sans_14pt_Regular',
  Noto_Sans_16pt_Regular = 'Noto_Sans_16pt_Regular',
  Noto_Sans_16pt_Light = 'Noto_Sans_16pt_Light',
  Noto_Sans_18pt_Regular = 'Noto_Sans_18pt_Regular',
  Noto_Sans_18pt_Light = 'Noto_Sans_18pt_Light',
  Noto_Sans_20pt_Light = 'Noto_Sans_20pt_Light',
  Noto_Sans_28pt_Light = 'Noto_Sans_28pt_Light',
  Noto_Sans_10pt_Regular_CAPS = 'Noto_Sans_10pt_Regular_CAPS',
  Noto_Sans_14pt_Medium_CAPS = 'Noto_Sans_14pt_Medium_CAPS',
  Noto_Sans_24pt_Light = 'Noto_Sans_24pt_Light',
  Noto_Sans_20pt_Medium = 'Noto_Sans_20pt_Medium',
  Noto_Sans_14pt_Light = 'Noto_Sans_14pt_Light',
  Noto_Sans_16pt_Medium = 'Noto_Sans_16pt_Medium',
  Noto_Sans_12pt_Medium = 'Noto_Sans_12pt_Medium',
  Gilroy_Medium = 'GilRoy_Medium',
  Gilroy_Bold = 'GilRoy_Bold',
  Gilroy_Light = 'GilRoy_Light',
  Gilroy_32pt_Light = 'GilRoy_32pt_Light',
  Gilroy_16pt_Light = 'GilRoy_16pt_Light',
  Gilroy_12pt_Light = 'GilRoy_12pt_Light',
  Gilroy_14pt_Light = 'GilRoy_14pt_Light',
  Gilroy_16pt_Bold = 'Gilroy_16pt_Bold',
  Gilroy_24pt_Light = 'Gilroy_24pt_Light',
  Gilroy_14pt_Medium = 'Gilroy_14pt_Medium',
  Gilroy_16pt_Medium = 'Gilroy_16pt_Medium',
}

export type Size = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl' | 'xxxl';

type Falsy = undefined | null | false;

export type SpacerProps = {
  /**
   * `size` for the spacer
   */
  size: Size;

  /**
   * `horizontal` sets the horizontal spacing
   */
  horizontal?: boolean;

  /**
   * `vertical` default type, sets the vertical spacing
   */
  vertical?: true | boolean;

  /**
   * `children` no child needed
   */
  children?: Falsy;
};

export enum IconSize {
  XXS = 8,
  XS = 12,
  S = 16,
  M = 20,
  L = 24,
  XL = 32,
  XXL = 40,
  XXXL = 48,
  XXXXL = 56,
  XXXXXL = 64,
}

export enum ChipSize {
  XXS = 16,
  XS = 24,
  S = 32,
  M = 40,
  L = 48,
  XL = 56,
  XXL = 64,
  NA = 'auto',
}
