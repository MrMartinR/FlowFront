import React, {createContext, useState, useContext} from "react";

export function getBreadcrumbsAndTitle(menuId, pathName) {
  const result = {
    breadcrumbs: [],
    title: ""
  };
  const menu = document.getElementById(menuId);
  if (!menu) {
    return result;
  }


  const activeLinksArray = Array.from(menu.getElementsByClassName("active") || []);
  const activeLinks = activeLinksArray.filter(el => el.tagName === "A");
  if (!activeLinks) {
    return result;
  }

  activeLinks.forEach(link => {
    const titleSpans = link.getElementsByClassName("menu-text");
    if (titleSpans) {
      const titleSpan = Array.from(titleSpans).find(t => t.innerHTML);
      if (titleSpan) {
        result.breadcrumbs.push(
            {
              pathname: link.pathname,
              title: titleSpan.innerHTML
            }
        );
      }
    }
  });
  result.title = getTitle(result.breadcrumbs, pathName);
  return result;
}

export function getTitle(breadCrumbs, pathname) {
  if (!breadCrumbs || !pathname) {
    return "";
  }

  const item = breadCrumbs.find(b => b.pathname === pathname);
  if (!item) {
    return  "";
  }

  return  item.title;
}

const SubheaderContext = createContext();

export function useSubheader() {
  return useContext(SubheaderContext);
}

export const SubheaderConsumer = SubheaderContext.Consumer;

export function MetronicSubheaderProvider({ children }) {
  const [title, setTitle] = useState("");
  const [breadcrumbs, setBreadcrumbs] = useState([]);
  const value = { title, setTitle, breadcrumbs, setBreadcrumbs };
  return <SubheaderContext.Provider value={value}>{children}</SubheaderContext.Provider>;
}
