import React, { useCallback, useMemo, useState } from "react";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
import "ag-grid-community/dist/styles/ag-grid.css";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-enterprise";
import styled from "styled-components";
import "antd/dist/antd.css";
import { expirationDateCellRenderer } from "./gridHelper";
import ColorsFilter from "./ColorsFilter";

export const Filters = {
  RED: "#ED4B40",
  ORANGE: "rgba(255, 153, 47, 1)",
  GREEN: "#3CB371",
  GRAY: "rgb(120, 120, 120)",
};

// Styled Components

const AgGridContainer = styled.div`
  width: 100%;
  height: 100%;
  padding: 1rem;
`;

const DsGrid = function (props) {
  const [filter, setFilterColor] = useState(undefined);

  const gridRows = useMemo(() => {
    let rows;
    if (!filter) {
      rows = props.rowsData;
    } else {
      rows = props.rowsData.filter(
        (row) => row.expirationStatus?.props.color === filter
      );
    }
    return rows;
  }, [filter]);

  const columns = useMemo(
    () => [
      {
        field: "expirationStatus",
        cellRenderer: "agGroupCellRenderer",
        pinned: "left",
        sortable: false,
        filter: false,
      },
      {
        field: "deliveryServiceName",
        pinned: "left",
      },
      { field: "metadata" },
      { field: "contentGroupId" },
      { field: "Networks" },
      { field: "serviceToken" },
      { field: "CDN" },
      { field: "routingMethod" },
      { field: "playbookLink" },
    ],
    []
  );

  const gridOptions = {
    columnDefs: columns,
    animateRows: true,
    masterDetail: true,
    defaultColDef: {
      resizable: true,
      floatingFilter: true,
      sortable: true,
      filter: "agTextColumnFilter",
    },
    detailCellRendererParams: {
      detailGridOptions: {
        columnDefs: [
          { field: "Domain" },
          {
            field: "expirationDate",
            cellRenderer: expirationDateCellRenderer,
            sortable: true,
          },
        ],
        defaultColDef: {
          flex: 1,
        },
      },
      getDetailRowData: (params) => {
        params.successCallback(params.data.callRecords);
      },
    },
    isRowMaster: (dataItem) => {
      return dataItem.callRecords.length > 0;
    },
    getRowHeight: useCallback((params) => {
      if (params.node && params.node.detail) {
        let offset = 63.8;
        let allDetailRowHeight =
          params.data.callRecords.length *
          params.api.getSizesForCurrentTheme().rowHeight;
        let gridSizes = params.api.getSizesForCurrentTheme();
        return (
          allDetailRowHeight +
          ((gridSizes && gridSizes.headerHeight) || 0) +
          offset
        );
      }
    }, []),
  };

  const onFilterChange = (color) => {
    if (filter === color) {
      setFilterColor(undefined);
    }
    if ((filter && filter !== color) || !filter) {
      setFilterColor(color);
    }
  };

  return (
    <>
      <ColorsFilter filter={filter} onFilterChange={onFilterChange} />
      <AgGridContainer>
        <div
          className="ag-theme-alpine"
          style={{ height: "75vh", width: "100%" }}
        >
          <AgGridReact gridOptions={gridOptions} rowData={gridRows} />
        </div>
      </AgGridContainer>
    </>
  );
};
export default DsGrid;

//TODO:
//Add filter to grid - done
//Clean code - done
// Add filter by status for expiration status - done
// Fit Detail grid size to number of rows - done
//Ds name to Delivery service Name - done
//Add tags to detailGrid - done
