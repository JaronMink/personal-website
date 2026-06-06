(function () {
  var filterRoot = document.querySelector('.pub-layout');
  if (!filterRoot) return;

  var buttons = Array.prototype.slice.call(filterRoot.querySelectorAll('.pub-area-filter'));
  var listButtons = Array.prototype.slice.call(filterRoot.querySelectorAll('.pub-filter-view--list .pub-area-filter'));
  var diagramButtons = Array.prototype.slice.call(filterRoot.querySelectorAll('.pub-area-venn .pub-area-filter'));
  var filterToggle = filterRoot.querySelector('[data-filter-toggle]');
  var filterPanel = filterRoot.querySelector('#pub-area-controls');
  var emptyState = filterRoot.querySelector('.pub-empty-state');
  var viewButtons = Array.prototype.slice.call(filterRoot.querySelectorAll('[data-filter-view-target]'));
  var views = Array.prototype.slice.call(filterRoot.querySelectorAll('[data-filter-view]'));
  var items = Array.prototype.slice.call(document.querySelectorAll('.pub-item'));
  var yearGroups = Array.prototype.slice.call(document.querySelectorAll('.pub-year-group'));
  var supportsHoverLinks = !!(window.matchMedia && window.matchMedia('(hover: hover) and (pointer: fine)').matches);
  var allArea = 'security-and-privacy';
  var buttonByArea = new Map();
  var listChildrenByArea = new Map();
  var listAreas = new Set();
  var groupItemsMap = new Map();
  var allLeafAreas = new Set();
  var selectedLeaves = new Set();
  var itemAreasByItem = new Map();
  var descendantsByButton = new Map();
  var leavesByButton = new Map();
  var buttonStateMeta = [];
  var diagramButtonMeta = [];

  if (buttons.length === 0 || items.length === 0) return;

  buttons.forEach(function (button) {
    var area = button.getAttribute('data-area');
    if (!area) return;
    if (!buttonByArea.has(area)) {
      buttonByArea.set(area, button);
    }
    var rawDescendants = button.getAttribute('data-descendants') || '';
    descendantsByButton.set(button, rawDescendants ? rawDescendants.split(/\s+/).filter(Boolean) : []);
  });

  listButtons.forEach(function (button) {
    var area = button.getAttribute('data-area');
    var parent = button.getAttribute('data-parent');
    if (!area) return;
    listAreas.add(area);
    if (!parent) return;
    if (!listChildrenByArea.has(parent)) {
      listChildrenByArea.set(parent, new Set());
    }
    listChildrenByArea.get(parent).add(area);
  });

  function areasFor(item) {
    var raw = item.getAttribute('data-areas') || '';
    if (!raw) return [];
    return raw.split(/\s+/).filter(Boolean);
  }

  items.forEach(function (item) {
    var itemAreas = areasFor(item);
    itemAreasByItem.set(item, itemAreas);
    itemAreas.forEach(function (area) {
      allLeafAreas.add(area);
    });
  });

  buttons.forEach(function (button) {
    var descendants = descendantsByButton.get(button) || [];
    leavesByButton.set(button, descendants.filter(function (area) {
      return allLeafAreas.has(area);
    }));
    var area = button.getAttribute('data-area');
    buttonStateMeta.push({
      button: button,
      area: area,
      inListView: !!button.closest('.pub-filter-view--list'),
      isLeaf: allLeafAreas.has(area)
    });
  });

  diagramButtons.forEach(function (button) {
    diagramButtonMeta.push({
      button: button,
      area: button.getAttribute('data-area')
    });
  });

  yearGroups.forEach(function (group) {
    groupItemsMap.set(group, Array.prototype.slice.call(group.querySelectorAll('.pub-item')));
  });

  function descendantsFor(button) {
    return descendantsByButton.get(button) || [];
  }

  function effectiveLeavesForButton(button) {
    return leavesByButton.get(button) || [];
  }

  function setButtonState() {
    var listStateByArea = new Map();

    function computeListState(area) {
      if (listStateByArea.has(area)) {
        return listStateByArea.get(area);
      }

      var children = listChildrenByArea.get(area);
      if (!children || children.size === 0) {
        var leaf = { isSelected: selectedLeaves.has(area), isPartial: false };
        listStateByArea.set(area, leaf);
        return leaf;
      }

      var allChildrenSelected = true;
      var anyChildMarked = false;
      children.forEach(function (childArea) {
        var childState = computeListState(childArea);
        if (!childState.isSelected) {
          allChildrenSelected = false;
        }
        if (childState.isSelected || childState.isPartial) {
          anyChildMarked = true;
        }
      });

      var branch = {
        isSelected: allChildrenSelected,
        isPartial: anyChildMarked && !allChildrenSelected
      };
      listStateByArea.set(area, branch);
      return branch;
    }

    buttonStateMeta.forEach(function (meta) {
      var button = meta.button;
      var area = meta.area;
      var inListView = meta.inListView;
      var isLeaf = meta.isLeaf;
      var isSelected = false;
      var isPartial = false;

      if (inListView) {
        if (listAreas.has(area)) {
          var listState = computeListState(area);
          isSelected = listState.isSelected;
          isPartial = listState.isPartial;
        } else {
          var listTargets = descendantsFor(button);
          if (listTargets.length === 0) {
            listTargets = [area];
          }
          var selectedCount = 0;
          listTargets.forEach(function (target) {
            if (selectedLeaves.has(target)) selectedCount += 1;
          });
          isSelected = listTargets.length > 0 && selectedCount === listTargets.length;
          isPartial = selectedCount > 0 && selectedCount < listTargets.length;
        }
      } else {
        var leaves = effectiveLeavesForButton(button);
        var selectedLeafCount = 0;
        leaves.forEach(function (leaf) {
          if (selectedLeaves.has(leaf)) selectedLeafCount += 1;
        });
        isSelected = leaves.length > 0 && selectedLeafCount === leaves.length;
      }

      button.classList.toggle('is-active', isSelected);
      button.classList.toggle('is-partial', isPartial);
      button.classList.toggle('is-direct-selected', isLeaf && isSelected);
      button.setAttribute('aria-pressed', isSelected ? 'true' : 'false');
    });
  }

  function clearDiagramHoverLinks() {
    diagramButtons.forEach(function (button) {
      button.classList.remove('is-hover-linked');
    });
  }

  function applyDiagramHoverLinks(area) {
    var source = buttonByArea.get(area);
    if (!source) return;

    var descendants = descendantsFor(source);
    var highlightAreas = new Set();
    descendants.forEach(function (descendant) {
      if (allLeafAreas.has(descendant)) {
        highlightAreas.add(descendant);
      }
    });

    if (highlightAreas.size === 0 && allLeafAreas.has(area)) {
      highlightAreas.add(area);
    }

    diagramButtonMeta.forEach(function (meta) {
      meta.button.classList.toggle('is-hover-linked', highlightAreas.has(meta.area));
    });
  }

  function applyFilter() {
    var showAll = selectedLeaves.size === allLeafAreas.size;
    var visibilityByItem = new Map();
    var visibleCount = 0;

    items.forEach(function (item) {
      var itemAreas = itemAreasByItem.get(item) || [];
      var matches = showAll || itemAreas.some(function (area) { return selectedLeaves.has(area); });
      visibilityByItem.set(item, matches);
      if (matches) visibleCount += 1;
      setElementVisibility(item, matches);
    });

    yearGroups.forEach(function (group) {
      var groupItems = groupItemsMap.get(group) || [];
      var hasVisibleItems = groupItems.some(function (item) {
        return visibilityByItem.get(item);
      });
      setElementVisibility(group, hasVisibleItems);
    });

    if (emptyState) {
      emptyState.hidden = visibleCount > 0;
    }

    setButtonState();
  }

  function setElementVisibility(el, shouldShow) {
    el.classList.toggle('is-filter-hidden', !shouldShow);
  }

  function selectAllLeaves() {
    selectedLeaves.clear();
    allLeafAreas.forEach(function (leaf) {
      selectedLeaves.add(leaf);
    });
  }

  function initializePanelMotionTargets() {
    if (!filterPanel) return;
    var targets = Array.prototype.slice.call(filterPanel.querySelectorAll('.pub-filter-view-toggle, .pub-filter-view-button, .pub-filter-panel, .pub-area-filter'));
    targets.forEach(function (el, index) {
      el.classList.add('is-panel-motion-target');
      el.style.setProperty('--panel-stagger-index', String(index));
    });
  }

  function setFilterView(viewName) {
    viewButtons.forEach(function (button) {
      var isActive = button.getAttribute('data-filter-view-target') === viewName;
      button.classList.toggle('is-active', isActive);
      button.setAttribute('aria-selected', isActive ? 'true' : 'false');
    });

    var nextView = null;

    views.forEach(function (view) {
      var isActive = view.getAttribute('data-filter-view') === viewName;
      if (isActive) nextView = view;
    });

    if (!nextView) return;

    views.forEach(function (view) {
      if (view.__hideTimer) {
        window.clearTimeout(view.__hideTimer);
        view.__hideTimer = null;
      }
      view.classList.remove('is-view-entering');
      view.classList.remove('is-view-leaving');
      view.classList.remove('is-view-overlay');
      view.hidden = view !== nextView;
    });
  }

  function setFilterPanelOpen(isOpen, options) {
    var immediate = !!(options && options.immediate);

    if (!filterToggle || !filterPanel) return;
    if (filterPanel.__hideTimer) {
      window.clearTimeout(filterPanel.__hideTimer);
      filterPanel.__hideTimer = null;
    }

    filterToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');

    if (immediate) {
      filterPanel.hidden = !isOpen;
      filterPanel.classList.toggle('is-open', isOpen);
      if (!isOpen) {
        selectAllLeaves();
        applyFilter();
      }
      return;
    }

    if (isOpen) {
      filterPanel.hidden = false;
      filterPanel.classList.add('is-open');
      return;
    }

    filterPanel.classList.remove('is-open');
    filterPanel.hidden = true;

    selectAllLeaves();
    applyFilter();
  }

  function applyAreaFromUrl() {
    if (typeof URLSearchParams === 'undefined') return false;
    var params = new URLSearchParams(window.location.search || '');
    var area = params.get('area');
    if (!area) return false;

    var buttonNode = buttonByArea.get(area);
    var leaves = buttonNode ? effectiveLeavesForButton(buttonNode) : [];
    if (leaves.length === 0 && allLeafAreas.has(area)) {
      leaves = [area];
    }
    if (leaves.length === 0) return false;

    selectedLeaves.clear();
    leaves.forEach(function (leaf) {
      selectedLeaves.add(leaf);
    });

    setFilterPanelOpen(true, { immediate: true });
    setFilterView('diagram', { immediate: true });
    applyFilter();
    return true;
  }

  if (filterToggle && filterPanel) {
    filterToggle.addEventListener('click', function () {
      var isOpen = filterToggle.getAttribute('aria-expanded') === 'true';
      setFilterPanelOpen(!isOpen);
    });
  }

  filterRoot.addEventListener('click', function (event) {
    var viewButton = event.target.closest('[data-filter-view-target]');
    if (!viewButton) return;
    setFilterView(viewButton.getAttribute('data-filter-view-target'));
  });

  filterRoot.addEventListener('click', function (event) {
    var button = event.target.closest('.pub-area-filter');
    if (!button) return;

    var area = button.getAttribute('data-area');
    if (!area) return;
    var buttonNode = buttonByArea.get(area);
    if (!buttonNode) return;

    var inListView = !!button.closest('.pub-filter-view--list');
    var leaves = inListView ? descendantsFor(button) : effectiveLeavesForButton(buttonNode);
    if (leaves.length === 0) {
      leaves = inListView ? [area] : (allLeafAreas.has(area) ? [area] : []);
    }
    if (leaves.length === 0) return;
    var allSelected = leaves.every(function (leaf) {
      return selectedLeaves.has(leaf);
    });
    if (area === allArea) {
      var allLeavesSelected = selectedLeaves.size === allLeafAreas.size;
      if (allLeavesSelected) {
        leaves.forEach(function (leaf) {
          selectedLeaves.delete(leaf);
        });
      } else {
        leaves.forEach(function (leaf) {
          selectedLeaves.add(leaf);
        });
      }
    } else if (allSelected) {
      leaves.forEach(function (leaf) {
        selectedLeaves.delete(leaf);
      });
    } else {
      leaves.forEach(function (leaf) {
        selectedLeaves.add(leaf);
      });
    }

    applyFilter();
  });

  if (supportsHoverLinks) {
    filterRoot.addEventListener('mouseover', function (event) {
      var button = event.target.closest('.pub-area-filter');
      if (!button) return;
      var area = button.getAttribute('data-area');
      if (!area) return;
      clearDiagramHoverLinks();
      applyDiagramHoverLinks(area);
    });

    filterRoot.addEventListener('mouseout', function (event) {
      var button = event.target.closest('.pub-area-filter');
      if (!button) return;
      var next = event.relatedTarget;
      if (next && button.contains(next)) return;
      clearDiagramHoverLinks();
    });
  }

  selectAllLeaves();
  initializePanelMotionTargets();
  setFilterView('diagram', { immediate: true });
  setFilterPanelOpen(false, { immediate: true });
  if (!applyAreaFromUrl()) {
    applyFilter();
  }

})();
