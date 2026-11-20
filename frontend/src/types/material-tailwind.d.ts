import "@material-tailwind/react";

type ExtraReactHtmlProps = {
  placeholder?: string;
  onResize?: React.ReactEventHandler<HTMLElement>;
  onResizeCapture?: React.ReactEventHandler<HTMLElement>;
  onPointerEnterCapture?: React.PointerEventHandler<HTMLElement>;
  onPointerLeaveCapture?: React.PointerEventHandler<HTMLElement>;
};

declare module "@material-tailwind/react" {
  interface TypographyProps extends ExtraReactHtmlProps {}
  interface ButtonProps extends ExtraReactHtmlProps {}
  interface IconButtonProps extends ExtraReactHtmlProps {}
  interface InputProps extends ExtraReactHtmlProps {}
  interface TextareaProps extends ExtraReactHtmlProps {}
  interface CheckboxProps extends ExtraReactHtmlProps {}
  interface RadioProps extends ExtraReactHtmlProps {}
  interface SwitchProps extends ExtraReactHtmlProps {}
  interface SliderProps extends ExtraReactHtmlProps {}
  interface SelectProps extends ExtraReactHtmlProps {}
  interface OptionProps extends ExtraReactHtmlProps {}
  interface MenuProps extends ExtraReactHtmlProps {}
  interface MenuHandlerProps extends ExtraReactHtmlProps {}
  interface MenuListProps extends ExtraReactHtmlProps {}
  interface MenuItemProps extends ExtraReactHtmlProps {}
  interface DialogProps extends ExtraReactHtmlProps {}
  interface DialogHeaderProps extends ExtraReactHtmlProps {}
  interface DialogBodyProps extends ExtraReactHtmlProps {}
  interface DialogFooterProps extends ExtraReactHtmlProps {}
  interface DrawerProps extends ExtraReactHtmlProps {}
  interface CardProps extends ExtraReactHtmlProps {}
  interface CardHeaderProps extends ExtraReactHtmlProps {}
  interface CardBodyProps extends ExtraReactHtmlProps {}
  interface CardFooterProps extends ExtraReactHtmlProps {}
  interface AlertProps extends ExtraReactHtmlProps {}
  interface AvatarProps extends ExtraReactHtmlProps {}
  interface BadgeProps extends ExtraReactHtmlProps {}
  interface ChipProps extends ExtraReactHtmlProps {}
  interface TooltipProps extends ExtraReactHtmlProps {}
  interface AccordionProps extends ExtraReactHtmlProps {}
  interface AccordionHeaderProps extends ExtraReactHtmlProps {}
  interface AccordionBodyProps extends ExtraReactHtmlProps {}
  interface TabsProps extends ExtraReactHtmlProps {}
  interface TabsHeaderProps extends ExtraReactHtmlProps {}
  interface TabsBodyProps extends ExtraReactHtmlProps {}
  interface TabProps extends ExtraReactHtmlProps {}
  interface TabPanelProps extends ExtraReactHtmlProps {}
}