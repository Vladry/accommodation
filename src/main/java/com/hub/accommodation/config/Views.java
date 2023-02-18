package com.hub.accommodation.config;

public class Views {
    public static class HiddenForAll {}
    public static class Public {}
    public static class BasicTarifUsers extends Public {}
    public static class ElevatedTarifUsers extends BasicTarifUsers {}
    public static class SeenToAll extends ElevatedTarifUsers{}
    public static class Internal extends SeenToAll{}
}
