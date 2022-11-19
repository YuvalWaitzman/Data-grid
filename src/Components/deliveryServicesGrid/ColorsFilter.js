import styled from "styled-components";
import { Filters } from "./DsGrid";
import "antd/dist/antd.css";

const ColorsFilter = (props) => {
  const FilterButton = styled.button`
    background-color: ${(props) => props.color};
    opacity: ${(props) =>
      props.filter === props.color || !props.filter ? "100%" : "55%"};
    border-radius: 3px;
    color: white;
    cursor: pointer;
    display: inline-block;
    font-family: CerebriSans-Regular, -apple-system, system-ui, Roboto,
      sans-serif;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: row;
    text-align: center;
    text-decoration: none;
    transition: all 250ms;
    border: 0;
    font-size: 12px;
    user-select: none;
    -webkit-user-select: none;
    touch-action: manipulation;
    height: 2rem;
    :hover {
      transform: scale(1.03);
    }
  `;
  const ButtonsContainer = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    width: 400px;
    grid-gap: 7px;
    margin-left: 16px;
    margin-top: 30px;
  `;
  const ColorsFilterContainer = styled.div``;

  return (
    <ColorsFilterContainer>
      <ButtonsContainer>
        <FilterButton
          onClick={() => {
            props.onFilterChange(Filters.GREEN);
          }}
          color={Filters.GREEN}
          filter={props.filter}
        >
          {"Days > 30"}
        </FilterButton>
        <FilterButton
          onClick={() => {
            props.onFilterChange(Filters.ORANGE);
          }}
          color={Filters.ORANGE}
          filter={props.filter}
        >
          {"7 < Days < 30"}
        </FilterButton>
        <FilterButton
          onClick={() => {
            props.onFilterChange(Filters.RED);
          }}
          color={Filters.RED}
          filter={props.filter}
        >
          {"Days < 7"}
        </FilterButton>
        <FilterButton
          onClick={() => {
            props.onFilterChange(Filters.GRAY);
          }}
          color={Filters.GRAY}
          filter={props.filter}
        >
          {"No Certificates"}
        </FilterButton>
      </ButtonsContainer>
    </ColorsFilterContainer>
  );
};

export default ColorsFilter;
