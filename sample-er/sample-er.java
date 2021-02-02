/* ========================= User class ========================= */

package com.example.erdiagram;

import com.example.erdiagram.Country;
import com.example.erdiagram.Permission;
import com.example.erdiagram.User;
import java.util.List;
import java.util.time.LocalDate;
import org.springframework.lang.NonNull;
import org.springframework.lang.Nullable;

public class User {

    @NonNull
    private Long id;
    @NonNull
    private String username;
    @NonNull
    private String name;
    @Nullable
    private LocalDate birthday;
    @NonNull
    private Boolean active;
    @NonNull
    private Country country;
    @Nullable
    private Country alternativeCountry;
    @NonNull
    private List<Permission> permissions;
    @NonNull
    private List<User> follows;
    @NonNull
    private List<User> followers;

    public Long getId() {
        return id;
    }

    public Long setId(Long id) {
        this.id = id;
    }

    public String getUsername() {
        return username;
    }

    public String setUsername(String username) {
        this.username = username;
    }

    public String getName() {
        return name;
    }

    public String setName(String name) {
        this.name = name;
    }

    public LocalDate getBirthday() {
        return birthday;
    }

    public LocalDate setBirthday(LocalDate birthday) {
        this.birthday = birthday;
    }

    public Boolean getActive() {
        return active;
    }

    public Boolean setActive(Boolean active) {
        this.active = active;
    }

    public Country getCountry() {
        return country;
    }

    public Country setCountry(Country country) {
        this.country = country;
    }

    public Country getAlternativeCountry() {
        return alternativeCountry;
    }

    public Country setAlternativeCountry(Country alternativeCountry) {
        this.alternativeCountry = alternativeCountry;
    }

    public List<Permission> getPermissions() {
        return permissions;
    }

    public List<Permission> setPermissions(List<Permission> permissions) {
        this.permissions = permissions;
    }

    public List<User> getFollows() {
        return follows;
    }

    public List<User> setFollows(List<User> follows) {
        this.follows = follows;
    }

    public List<User> getFollowers() {
        return followers;
    }

    public List<User> setFollowers(List<User> followers) {
        this.followers = followers;
    }

}

/* ========================= Country class ========================= */

package com.example.erdiagram;

import org.springframework.lang.NonNull;

public class Country {

    @NonNull
    private Long id;
    @NonNull
    private String code;
    @NonNull
    private String name;

    public Long getId() {
        return id;
    }

    public Long setId(Long id) {
        this.id = id;
    }

    public String getCode() {
        return code;
    }

    public String setCode(String code) {
        this.code = code;
    }

    public String getName() {
        return name;
    }

    public String setName(String name) {
        this.name = name;
    }

}

/* ========================= Permission class ========================= */

package com.example.erdiagram;

import com.example.erdiagram.User;
import java.util.List;
import org.springframework.lang.NonNull;

public class Permission {

    @NonNull
    private Long id;
    @NonNull
    private String code;
    @NonNull
    private String description;
    @NonNull
    private List<User> users;

    public Long getId() {
        return id;
    }

    public Long setId(Long id) {
        this.id = id;
    }

    public String getCode() {
        return code;
    }

    public String setCode(String code) {
        this.code = code;
    }

    public String getDescription() {
        return description;
    }

    public String setDescription(String description) {
        this.description = description;
    }

    public List<User> getUsers() {
        return users;
    }

    public List<User> setUsers(List<User> users) {
        this.users = users;
    }

}

/* ========================= Tree class ========================= */

package com.example.erdiagram;

import com.example.erdiagram.TreeNode;
import org.springframework.lang.NonNull;

public class Tree {

    @NonNull
    private Long id;
    @NonNull
    private TreeNode headNode;

    public Long getId() {
        return id;
    }

    public Long setId(Long id) {
        this.id = id;
    }

    public TreeNode getHeadNode() {
        return headNode;
    }

    public TreeNode setHeadNode(TreeNode headNode) {
        this.headNode = headNode;
    }

}

/* ========================= TreeNode class ========================= */

package com.example.erdiagram;

import com.example.erdiagram.TreeNode;
import java.util.List;
import org.springframework.lang.NonNull;
import org.springframework.lang.Nullable;

public class TreeNode {

    @NonNull
    private Long id;
    @NonNull
    private Integer value;
    @Nullable
    private TreeNode parent;
    @NonNull
    private List<TreeNode> children;

    public Long getId() {
        return id;
    }

    public Long setId(Long id) {
        this.id = id;
    }

    public Integer getValue() {
        return value;
    }

    public Integer setValue(Integer value) {
        this.value = value;
    }

    public TreeNode getParent() {
        return parent;
    }

    public TreeNode setParent(TreeNode parent) {
        this.parent = parent;
    }

    public List<TreeNode> getChildren() {
        return children;
    }

    public List<TreeNode> setChildren(List<TreeNode> children) {
        this.children = children;
    }

}
