/* ========== User class ========== */

import java.time.LocalDate;
import java.util.List;

public class User {

    private Long id;
    private String username;
    private String name;
    private LocalDate birthday;
    private byte[] avatar;
    private Boolean active;
    private Country country;
    private Country alternativeCountry;
    private List<Permission> permissions;
    private List<User> follows;
    private List<User> followers;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public LocalDate getBirthday() {
        return birthday;
    }

    public void setBirthday(LocalDate birthday) {
        this.birthday = birthday;
    }

    public byte[] getAvatar() {
        return avatar;
    }

    public void setAvatar(byte[] avatar) {
        this.avatar = avatar;
    }

    public Boolean getActive() {
        return active;
    }

    public void setActive(Boolean active) {
        this.active = active;
    }

    public Country getCountry() {
        return country;
    }

    public void setCountry(Country country) {
        this.country = country;
    }

    public Country getAlternativeCountry() {
        return alternativeCountry;
    }

    public void setAlternativeCountry(Country alternativeCountry) {
        this.alternativeCountry = alternativeCountry;
    }

    public List<Permission> getPermissions() {
        return permissions;
    }

    public void setPermissions(List<Permission> permissions) {
        this.permissions = permissions;
    }

    public List<User> getFollows() {
        return follows;
    }

    public void setFollows(List<User> follows) {
        this.follows = follows;
    }

    public List<User> getFollowers() {
        return followers;
    }

    public void setFollowers(List<User> followers) {
        this.followers = followers;
    }

}

/* ========== Country class ========== */

public class Country {

    private Long theCountryId;
    private String code;
    private String name;

    public Long getTheCountryId() {
        return theCountryId;
    }

    public void setTheCountryId(Long theCountryId) {
        this.theCountryId = theCountryId;
    }

    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

}

/* ========== Permission class ========== */

import java.util.List;

public class Permission {

    private Long id;
    private String code;
    private String description;
    private List<User> users;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public List<User> getUsers() {
        return users;
    }

    public void setUsers(List<User> users) {
        this.users = users;
    }

}

/* ========== Tree class ========== */

public class Tree {

    private Long id;
    private TreeNode headNode;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public TreeNode getHeadNode() {
        return headNode;
    }

    public void setHeadNode(TreeNode headNode) {
        this.headNode = headNode;
    }

}

/* ========== TreeNode class ========== */

import java.util.List;

public class TreeNode {

    private Long id;
    private Integer value;
    private TreeNode parent;
    private List<TreeNode> children;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Integer getValue() {
        return value;
    }

    public void setValue(Integer value) {
        this.value = value;
    }

    public TreeNode getParent() {
        return parent;
    }

    public void setParent(TreeNode parent) {
        this.parent = parent;
    }

    public List<TreeNode> getChildren() {
        return children;
    }

    public void setChildren(List<TreeNode> children) {
        this.children = children;
    }

}
