import React from "react";
import PropTypes from "prop-types";

import Panels from "./Panels";
import Panel from "./Panel/Panel";
import { componentWithName } from "../../util-prop-types";
import { isEqual } from "../../utils/sets";

class ExpandCollapse extends React.Component {
  state = {
    openPanels: new Set(this.props.open),
    prevOpenPanels: new Set(),
  };

  static getDerivedStateFromProps(props, state) {
    const { prevOpenPanels } = state;
    const open = new Set(props.open);

    if (!isEqual(open, prevOpenPanels)) {
      return {
        openPanels: open,
        prevOpenPanels: open,
      };
    }
    return null;
  }

  togglePanel = (panelId) => {
    const { onToggle } = this.props;

    this.setState(
      ({ openPanels }) => {
        const nextPanels = new Set(openPanels);

        if (nextPanels.has(panelId)) {
          nextPanels.delete(panelId);
        } else {
          nextPanels.add(panelId);
        }

        return { openPanels: nextPanels };
      },
      () => {
        if (onToggle) {
          onToggle(Array.from(this.state.openPanels));
        }
      }
    );
  };

  isPanelOpen = (panelId) => {
    return this.state.openPanels.has(panelId);
  };

  render() {
    const { tag, children, compact, ...rest } = this.props;

    return (
      <Panels
        {...rest}
        isPanelOpen={this.isPanelOpen}
        togglePanel={this.togglePanel}
        tag={tag}
        compact={compact}
      >
        {children}
      </Panels>
    );
  }
}

ExpandCollapse.propTypes = {
  open: PropTypes.arrayOf(PropTypes.string),
  topDivider: PropTypes.bool,
  onToggle: PropTypes.func,
  tag: PropTypes.oneOf(["h1", "h2", "h3", "h4"]),
  children: componentWithName("Panel"),
  compact: PropTypes.bool,
};

ExpandCollapse.defaultProps = {
  open: [],
  topDivider: true,
  onToggle: undefined,
  tag: undefined,
  children: undefined,
  compact: false,
};

ExpandCollapse.Panel = Panel;

export default ExpandCollapse;
