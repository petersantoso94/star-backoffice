/**
 * EventBus is used to communicate between different module
 */
import Vue from "vue";

export const ChooseCurrentPage = (page = "GameSetting") => {
  EventBus.$emit("choose-current-page", page);
};

const EventBus = new Vue();
export default EventBus;
