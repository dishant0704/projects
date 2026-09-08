import { Link } from "react-router";
import { useEffect, useMemo } from "react";

import Tabs from "../UiComponents/Tabs";

import ReguralAccordion from "./ReguralAccordion";
import DynamicAccordion from "./DynamicAccordion";

import {
  useAppDispatch,
  useAppSelector,
} from "../../app/hooks/reducHooks";

import {
  loadAccordionPage,
} from "../../app/features/accordion/accordionSlice";

import type { TabItem } from "../UiComponents/Tabs/types";

const componentRegistry: Record<
  string,
  React.ComponentType<any>
> = {
  ReguralAccordion,
  DynamicAccordion,
};

const AccordionRoot = () => {
  const dispatch = useAppDispatch();

  const {
    page,
    loading,
    error,
  } = useAppSelector(
    (state) => state.accordion
  );

  console.log("AccordionRoot page:", page);
  console.log("AccordionRoot loading:", loading);
  console.log("AccordionRoot error:", error);

  useEffect(() => {
    dispatch(loadAccordionPage())
    .unwrap()
    .then((pageData) => {
      console.log(
        "Accordion page loaded successfully:",
        pageData
      );
    })
    .catch((err) => {
      console.error(
        "Failed to load accordion page:",
        err
      );
    });
  }, [dispatch]);

  const tabs: TabItem[] = useMemo(() => {
    if (!page?.items) {
      return [];
    }

    return page.items.map((tab) => {
      const Component = componentRegistry[tab.component];

      return {
        id: tab.id,
        label: tab.label,

        component:
          Component ?? (() => <div>Component "{tab.component}" not found</div>),

        props: {
          ...(tab.props ?? {}),
          data: tab.items ?? [],
        },
      };
    });
  }, [page]);

  if (loading) {
    return <div className="p-5">Loading Accordion...</div>;
  }

  if (error) {
    return (
      <div className="p-5 text-red-500">
        Error: {error}
      </div>
    );
  }

  if (!page) {
    return (
      <div className="p-5">
        <h1>Accordion</h1>
        <p>Accordion page configuration was not loaded.</p>
      </div>
    );
  }

  return (
    <section className="p-5">
      <h1>Accordion:</h1>

      <Link
        to="/"
        className="text-[14px] text-primary-6-light-6"
      >
        Back to Dashboard
      </Link>

      <div className="w-full">
        <Tabs
          items={tabs}
          defaultActiveTab="regAcc"
        />
      </div>
    </section>
  );
};

export default AccordionRoot;
