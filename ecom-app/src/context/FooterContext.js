import React, { createContext, useContext } from "react";

const FooterContext = createContext();

export const FooterProvider = ({ children }) => {
  const footerLinks = [
    { text: "Twitter", url: "https://twitter.com/irealparas" },
    { text: "LinkedIn", url: "https://www.linkedin.com/in/irealparas" },
    { text: "GitHub", url: "https://github.com/ParasMohan" }
  ];

  return (
    <FooterContext.Provider value={{ footerLinks }}>
      {children}
    </FooterContext.Provider>
  );
};

export const useFooter = () => useContext(FooterContext);
