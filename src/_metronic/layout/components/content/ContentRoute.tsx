import React from "react";
import { Route } from "react-router-dom";
import { Content } from "./Content";

//[REV] added type any on ContentRoute props
export function ContentRoute({ children, component, render, ...props }: any) {
  return (
    <Route {...props}>
      {(routeProps) => {
        if (typeof children === "function") {
          return <Content>{children(routeProps)}</Content>;
        }

        if (!routeProps.match) {
          return null;
        }

        if (children) {
          return <Content>{children}</Content>;
        }

        if (component) {
          return (
            <Content>{React.createElement(component, routeProps)}</Content>
          );
        }

        if (render) {
          return <Content>{render(routeProps)}</Content>;
        }

        return null;
      }}
    </Route>
  );
}