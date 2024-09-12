import { ComponentPropsWithoutRef, type ReactNode } from "react";

interface LayoutProps extends ComponentPropsWithoutRef<any> {
  /**  Main content of an application */
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="d-flex flex-column bg-white container-fluid">
      {children}
    </div>
  );
};

export default Layout;
