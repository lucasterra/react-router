import { ComponentClass, StatelessComponent } from "react";
import { Location, LocationDescriptor } from "history";
import { ToLocationFunction } from "./IndexLink";

type ComponentConstructor<P> = ComponentClass<P> | StatelessComponent<P>;

export interface LinkProperties {
  to?: LocationDescriptor | ToLocationFunction;
  onlyActiveOnIndex?: boolean;
  onClick?: (e: any) => any;
  onNavigate?: (e: any) => any;
  target?: string;
  active?: boolean;
}

declare function LinkEnhancer<P, S>(component: ComponentConstructor<P> & S): ComponentClass<P & LinkProperties> & S;
declare function LinkEnhancer<P>(component: ComponentConstructor<P>): ComponentClass<P & LinkProperties>;

export default LinkEnhancer;
