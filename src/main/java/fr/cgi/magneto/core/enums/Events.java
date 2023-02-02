package fr.cgi.magneto.core.enums;

public enum Events {
    ACCESS("ACCESS"),
    CREATE_BOARD("CREATE_BOARD"),
    CREATE_MAGNET("CREATE_MAGNET"),
    CREATE_SECTION("CREATE_SECTION");

    private final String name;

    Events(String name) {
        this.name = name;
    }

    public String getName() {
        return this.name;
    }
}