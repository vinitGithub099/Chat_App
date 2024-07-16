import {
  Tab,
  Tabs,
  TabsBody,
  TabsHeader,
  Typography,
} from "@material-tailwind/react";
import cx from "classnames";
import { useDispatch, useSelector } from "react-redux";
import { searchTabs } from "../../constants/searchTabs";
import { updateActiveTab } from "../../store/Features/Search/searchSlice";
import ChatCard from "../ChatCard";
import classes from "./index.module.css";
import SearchUserCard from "./SearchUserCard";

const SearchList = () => {
  const { activeTab, searchState } = useSelector((state) => state.search);
  const dispatch = useDispatch();

  const renderTabPanel = (item) => {
    switch (activeTab) {
      case searchTabs.USERS:
        return <SearchUserCard key={item._id} {...item} />;
      case searchTabs.CHATS:
        return <ChatCard key={item._id} {...item} />;
      default:
        return null;
    }
  };

  return (
    <Tabs value={activeTab} className={classes.searchListContainer}>
      <TabsHeader
        className={classes.tabsHeader}
        indicatorProps={{ className: classes.indicator }}
      >
        {Object.values(searchTabs).map((tab) => (
          <Tab
            key={tab}
            value={tab}
            onClick={() => dispatch(updateActiveTab(tab))}
            className={cx(classes.tab, {
              [classes.activeTab]: activeTab === tab,
            })}
          >
            {tab}
          </Tab>
        ))}
      </TabsHeader>
      <TabsBody className={classes.tabsBody}>
        {searchState[activeTab]?.data?.length ? (
          searchState[activeTab].data.map(renderTabPanel)
        ) : (
          <Typography variant="small" className={classes.emptyResponse}>
            Nothing to show!
          </Typography>
        )}
      </TabsBody>
    </Tabs>
  );
};

export default SearchList;
