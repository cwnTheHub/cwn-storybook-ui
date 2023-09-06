import React from "react";
import PropTypes from "prop-types";

import Panels from "../Panels";
import Panel from "../Panel/Panel";
import { componentWithName } from "../../../util-prop-types";
class Accordion extends React.Component {
  state = {
    openPanel: this.props.open,
    prevOpenPanel: null,
  };

  static getDerivedStateFromProps(props, state) {
    const { prevOpenPanel } = state;
    const open = props.open;

    if (open !== prevOpenPanel) {
      return {
        openPanel: open,
        prevOpenPanel: open,
      };
    }
    return null;
  }

  togglePanel = (panelId) => {
    const { onToggle } = this.props;

    this.setState(
      ({ openPanel }) => {
        return {
          openPanel: openPanel === panelId ? undefined : panelId,
        };
      },
      () => {
        if (onToggle) {
          onToggle(this.state.openPanel);
        }
      }
    );
  };

  isPanelOpen = (panelId) => {
    return this.state.openPanel === panelId;
  };

  render() {
    const { children, ...rest } = this.props;

    return (
      <Panels
        {...rest}
        isPanelOpen={this.isPanelOpen}
        togglePanel={this.togglePanel}
      >
        {children}
      </Panels>
    );
  }
}

Accordion.propTypes = {
  open: PropTypes.string,
  topDivider: PropTypes.bool,
  onToggle: PropTypes.func,
  children: componentWithName("Panel"),
};

Accordion.defaultProps = {
  open: undefined,
  topDivider: true,
  onToggle: undefined,
  children: undefined,
};

Accordion.Panel = Panel;

export default Accordion;
