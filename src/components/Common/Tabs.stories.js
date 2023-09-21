import React from "react";
import Tabs from "../../common/common-tabs/Tabs";

export default {
  title: "Common components/Tabs",
  component: Tabs,
};

export const MinimalUsage = () => {
  return (
    <Tabs copy="en">
      <Tabs.Panel heading="Themepacks">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed et odio ac
        justo pellentesque auctor. Nulla facilisi. Cras eu velit nec ex
        consequat aliquet. Vestibulum id tristique nunc. Aliquam non augue nec
        est vehicula hendrerit ac vel lectus.
      </Tabs.Panel>
      <Tabs.Panel heading="Premium">
        Praesent eget tincidunt odio, nec tincidunt erat. Sed viverra fringilla
        nibh, eget volutpat ex aliquam at.
      </Tabs.Panel>
      <Tabs.Panel heading="Essentials">
        Vivamus id mi ut nulla sagittis pharetra. Donec ut mauris et purus
        convallis aliquet. Nulla facilisi.
      </Tabs.Panel>
      <Tabs.Panel heading="More content">
        Phasellus varius, urna vel vehicula iaculis, ligula dui hendrerit odio,
        a viverra dolor justo sed ex. Integer sagittis, quam eu laoreet
        tincidunt, justo orci feugiat ipsum, nec gravida dui nisl id purus. Sed
        vel dictum eros, sit amet tempor ipsum.
      </Tabs.Panel>
      <Tabs.Panel heading="More content again">
        Cras eu velit nec ex consequat aliquet. Vestibulum id tristique nunc.
        Aliquam non augue nec est vehicula hendrerit ac vel lectus. Praesent
        eget tincidunt odio, nec tincidunt erat. Sed viverra fringilla nibh,
        eget volutpat ex aliquam at. Vivamus id mi ut nulla sagittis pharetra.
        Donec ut mauris et purus convallis aliquet. Nulla facilisi. Phasellus
        varius, urna vel vehicula iaculis, ligula dui hendrerit odio, a viverra
        dolor justo sed ex. Integer sagittis, quam eu laoreet tincidunt, justo
        orci feugiat ipsum, nec gravida dui nisl id purus. Sed vel dictum eros,
        sit amet tempor ipsum.
      </Tabs.Panel>
      <Tabs.Panel heading="Even more content">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed et odio ac
        justo pellentesque auctor. Nulla facilisi. Cras eu velit nec ex
        consequat aliquet. Vestibulum id tristique nunc. Aliquam non augue nec
        est vehicula hendrerit ac vel lectus. Praesent eget tincidunt odio, nec
        tincidunt erat. Sed viverra fringilla nibh, eget volutpat ex aliquam at.
        Vivamus id mi ut nulla sagittis pharetra. Donec ut mauris et purus
        convallis aliquet. Nulla facilisi. Phasellus varius, urna vel vehicula
        iaculis, ligula dui hendrerit odio, a viverra dolor justo sed ex.
        Integer sagittis, quam eu laoreet tincidunt, justo orci feugiat ipsum,
        nec gravida dui nisl id purus. Sed vel dictum eros, sit amet tempor
        ipsum.
      </Tabs.Panel>
    </Tabs>
  );
};

export const Multiline = () => {
  const longLabels = [
    "Cliniques et médecins",
    "Pharmacies",
    "Professionnels de la santé affiliés",
    "Régime collectif d’assurance santé",
    "Régies de la santé et hôpitaux",
    "Solutions de santé personnelle",
  ];
  const [open, setOpen] = React.useState("Pharmacies");

  const handleOpen = (id) => {
    setOpen(id);
  };

  return (
    <Tabs copy="fr" wrapLabels open={open} onOpen={handleOpen}>
      {longLabels.map((label) => (
        <Tabs.Panel id={label} heading={label} key={label}>
          {label}
        </Tabs.Panel>
      ))}
    </Tabs>
  );
};
