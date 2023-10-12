import React from "react";
import SideNavigation from "../../../common/common-sideNavigation/SideNavigation";

export default {
  title: "Common components/SideNavigation",
  component: SideNavigation,
};

const Template = (args) => {
  return (
    <SideNavigation
      accordion={args.accordion}
      verticalSpacing={args.verticalSpacing}
      category={args.category}
    >
      {args.children}
    </SideNavigation>
  );
};

export const Use = Template.bind({});
Use.args = {
  accordion: true,
  verticalSpacing: 3,
  category: "Optional Category Title",
  children: (
    <>
      <SideNavigation.Link href="#">Top of the page</SideNavigation.Link>
      <SideNavigation.SubMenu
        handleToggleSubMenu={() => console.log("clicked")}
        isOpen={true}
        label="Overview"
      >
        <SideNavigation.Link href="#introduction" active>
          Link 1
        </SideNavigation.Link>
        <SideNavigation.Link href="#linktwo">Link 2</SideNavigation.Link>
        <SideNavigation.Link href="#linkthree">Link 3</SideNavigation.Link>
      </SideNavigation.SubMenu>
      <SideNavigation.SubMenu
        handleToggleSubMenu={() => console.log("clicked")}
        label="Reference Architecture"
      >
        <SideNavigation.Link href="#reference">Overview</SideNavigation.Link>
      </SideNavigation.SubMenu>
    </>
  ),
};
